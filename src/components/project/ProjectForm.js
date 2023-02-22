import {useState, useEffect} from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import Project from '../pages/Project'


function ProjectForm({handleSubmit,textobtn, projectdate}){
 
    const[categories, setCategories] = useState([])
    const[project, setProject] = useState(projectdate || {})
   useEffect(() =>  {
        
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers:{
                'Content-type':'aplication/json',
            },
        })
        .then((resp => resp.json()))
        .then((data)=>{
            setCategories(data)
            
        })
        .catch((erro) => console.log(erro))
    }, [])

    const submit =(e) =>{
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }
    function handleChange(e){
        setProject({...project, 
            [e.target.name]: e.target.value
        })

    }
    function handleCategory(e){
        setProject({
            ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        },
    })

    }

    return(
        <form onSubmit={submit}>
            <Input type='text' text='Nome do projeto' placeholder='Insira o nome do projeto' name='name' handleOnChange={handleChange} value={project.name ? project.name.id : ''}/>

            <Input type='number' text='Orçamento do projeto' placeholder='Insira o orçamento total' name='budget' handleOnChange={handleChange} value={project.budget  ? project.budget.id : ''}/>
            
            <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
            
            <Submit text={textobtn}/>

        </form>
    )
}
export default ProjectForm