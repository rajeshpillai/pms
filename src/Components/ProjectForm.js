import React, { Component } from 'react';
import axios from 'axios';

export default class ProjectForm extends Component {
    constructor() {
        super();
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onNewClick = this.onNewClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
    }

    state = {
        projects: [],
        editProject: {
            id: "",
            projectName: "",
            desc: ""
        }
    }

    onNewClick() {
        this.setState({
            ...this.state,
            editProject: {
                id: "",
                projectName: "",
                desc: ""
            }
        })
    }

    onNameChange(e) {
        this.setState({
            ...this.state,
            editProject: {
                ...this.state.editProject,
                projectName: e.target.value
            }
        })
    }

    onDescChange(e) {
        console.log(e.target);
        this.setState({
            ...this.state,
            editProject: {
                ...this.state.editProject,
                desc: e.target.value
            }
        })
    }

    onEditClick (id) {
        var project = this.state.projects.filter(function (p) {
            if (p.id === id) {
                return p;
            }
        });

        //alert(JSON.stringify(project));

        this.setState({
            ...this.state,
            editProject: project[0]
        })
    }

    onSubmitClick() {
        var self = this;
        var data = {
            projectName: this.projectName.value, 
            desc: this.desc.value 
        }

        var project = this.state.editProject;

        if (project.id) {  // edit mode
            axios.post('/project/edit', this.state.editProject)
            .then(function(response){
            console.log('saved successfully')

            self.setState({
                projects: response.data
            })
        });  
        }
        else {
            axios.post('/project', data)
                .then(function(response){
                console.log('saved successfully')

                self.setState({
                    projects: response.data
                })
            });  
        }
    }

    render () {
        console.dir(this.state);
        var projectList = this.state.projects.map((p) => {
            return (
                <li key={p.id}>
                    {p.projectName}
                    <input 
                        onClick={() => {
                            this.onEditClick(p.id);
                        }}
                        type="button" value="edit" />
                </li>
            )
        });

        var {editProject} = this.state;
        return (
            <div>
                <input type="hidden" value= {editProject.id} />
                <input 
                    onChange = {this.onNameChange}
                    ref={(projectName) => { this.projectName = projectName; }} 
                    value = {editProject.projectName}
                    type="text" placeholder="Enter project name" />

                <input onChange={this.onDescChange}
                ref={(desc) => { this.desc = desc; }} 
                value = {editProject.desc}
                type="text" placeholder="Enter project description" />
                
                <input type="button" onClick={this.onSubmitClick} value="Submit" />
                <input type="button" onClick={this.onNewClick} value="New" />
                
                <ul>
                    {projectList}
                </ul>
            </div>
        );
    }
}
