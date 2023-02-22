import styles from './NewProject.module.css'

import ProjectForm from '../project/ProjectForm'

import { useNavigate } from 'react-router-dom'

function NewProject(){

    const history = useNavigate()

    function createPost(project){
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
        .then((data)=>{
            console.log(data)
            history('/projects', { state: { message: 'Projeto criado com sucesso!'}})
        })
        .catch(erro => console.log(erro))
    }
    return(
        <div className={styles.caixa_newProject}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} textobtn='Criar projeto'/>
        </div>
    )
}

export default NewProject