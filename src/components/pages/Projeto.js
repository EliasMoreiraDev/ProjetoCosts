import {parse, v4 as uuidv4} from 'uuid'

import styles from './Projeto.module.css'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layouts/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Projeto(){
    const {id} = useParams()
    console.log(id)

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
     
    useEffect(() =>{

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            }).then(resp => resp.json())
            .then((data)=>{
                setProject(data)
                setServices(data.services)
            })
            .catch(erro => console.log(erro))
            },1500)
    },[id])

    function editPost(project){
        setMessage('')
        
        if(project.budget < project.costs){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),

        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(erro => console.log(erro))
        
    }
    function createService(project){
        setMessage('')
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(project)
        }).then(resp => resp.json() )
        .then((data) =>{
            console.log(data)
            setShowServiceForm(false)
        })
        .catch(erro => console.log(erro))        
    }

    function removeService(id, cost){

        const servicesUpdated = project.services.filter((service) => service.id !== id)

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
    
        projectUpdated.cost = parseFloat
        (projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then(resp => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setType('success')
        })
        .catch(erro=>console.log(erro))
    }

    

    
    function toogleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toogleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return(
        
        <>
        {project.name ? (
        <div className={styles.project_details}>
            <div>
                {message && <Message type={type} msg={message}/>}
                <div className={styles.details_container}>
                    <div className={styles.title_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toogleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                    </div>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria: </span>{project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento: </span>R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado: </span>R${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <ProjectForm handleSubmit={editPost} textobtn='Concluir edição' projectdate={project}/>
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <div className={styles.title_service_form}>
                        <h2>Adicione um serviço</h2>
                        <button className={styles.btn} onClick={toogleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                    </div>
                    <div className={styles.project_info}>
                        {showServiceForm &&(
                            <ServiceForm handleSubmit={createService}
                            projectData={project} btnText='Adicionar Serviço'/>
                        )}
                    </div>
                </div>
                <h2 className={styles.title_container_services}>Serviços</h2>
                <div className={styles.container_services}>
                    {services.length > 0 &&
                        services.map((service) =>(
                            <ServiceCard
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            handleRemove={removeService}
                            />
                        ))
                    }
                    {services.length === 0 &&
                        <div className={styles.container_no_services}>
                            <h2 className={styles.no_services}>Não existe serviços cadastrados</h2>
                        </div>
                    
                    }
                </div>
            </div>
        </div>)

         : (<Loading/>)}
        </>
    )
}

export default Projeto