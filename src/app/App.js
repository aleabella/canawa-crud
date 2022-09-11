import React, { Component } from 'react';



class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    //agregar tareas y guardarla
    addTask(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`/api/tasks/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: this.state.title,
              description: this.state.description
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              window.M.toast({html: 'Se ha guardado los cambios'});
              this.setState({_id: '', title: '', description: ''});
              this.fetchTasks();
            });
        } else {
          fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              window.M.toast({html: 'Task Saved'});
              this.setState({title: '', description: ''});
              this.fetchTasks();
            })
            .catch(err => console.error(err));
        }
    
      }
    

    

    componentDidMount(){
        this.fetchTasks();
    }

    //obtener tareas
    fetchTasks (){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
                });
    } 
    //evento de eliminar

    deleteTask(id) {
        if(confirm('¿Estas seguro de querer eliminarlo?')) {
          fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              M.toast({html: 'Comentario borrado'});
              this.fetchTasks();
            });
        }
      }
//evento de editar task 
    editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
  }
    handleChange(e) {
        const { name, value} = e.target; 
        this.setState({
            [name]: value
        } )
    }


    render() {
        return (
            <div>
                {/*NAVIGATION*/}
                <nav className='red darken-2'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>Canawa Glampings</a>
                        
                    </div>
                </nav>

                <div className='container'>
             
                    <p> Para <b>Canawa Glampings</b> es muy importante contar con tu opinión y saber la experiencia que tuviste con nosotros para que otras personas puedan conocernos mejor, a continuación encontrarás un espacio donde puedes dejarnos tus comentarios. </p>
                    
                    <div className='row'>
                        
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' onChange={this.handleChange} type='text' placeholder='nombre o frase que represente tu experiecia' value={this.state.title}></input>

                                            </div>

                                        </div>

                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name='description' onChange={this.handleChange} placeholder='puedes contarnos tu experiencia' className='materialize-textarea' value={this.state.description}></textarea>

                                            </div>

                                        </div>

                                        <button type='submit' className='btn red darken-2'>
                                            enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'></div>
                            <table>
                                <thead>
                                    <tr>
                                        <th> Titulo</th>
                                        <th> Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map( task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title} </td>
                                                    <td>{task.description} </td>
                                                    <td>
                                                        <button onClick={() => this.editTask(task._id)} className='btn red darken-2'>
                                                            <i className='material-icons'>edit</i>
                                                            
                                                        </button>
                                                        <button className='btn red darken-2' style={{margin: '4px'}} onClick={() => this.deleteTask(task._id)}>
                                                            <i className='material-icons' >delete</i>
                                                            
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                    </div>

                </div>
            </div>
        )
    }
}
export default App;