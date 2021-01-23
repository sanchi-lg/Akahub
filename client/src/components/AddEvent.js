import React, { Component } from 'react'
import axios from 'axios'


export class AddEvent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            event:"",addDet:"",err:""
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('email')) {
            this.props.history.push("/signup")
        }
       
    }

    submit = (e) => {
        e.preventDefault()
        if(this.state.err.length!=0){
            return
        }
        axios.post(`http://localhost:9000/addevent/${localStorage.getItem('email')}`, this.state)

            .then(res => {
                alert(res.data.mssg)

                if (res.data.err == 0) {
                    this.props.history.push("/")
                }
                else {

                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    handle = (e) => {
        const { name, value } = e.target
        if(name=="event"){
            if(value.length<3){
                this.setState({err:"Entered event should be atleast 3 character long"})
                return
            }
            else{
                this.setState({err:""})
            }
        }
        this.setState({ [name]: value })

    }

    
    render() {
        return (
            <div style={{ width: "70%", margin: "auto", marginTop: "80px" }}>
                <form className="new order" onSubmit={this.submit}>
                    <fieldset style={{ padding: "5px", borderWidth: "0.1px", borderRadius: "3px" }}>
                        <legend style={{ marginTop: "10px", marginBottom: "17px", color: "blue", fontSize: "large" }}>Add Order</legend>                  
                        


                        <div>
                            <br />
                            <label>Event</label>
                            <input type="text" name="event" onChange={this.handle} required />
                        </div>
                        {this.state.err!=""&&<div style={{fontSize:"small",color:"crimson"}}>{this.state.err}</div>}
                        <br />
                        <div>
                            <label>Description</label>

                          <textarea style={{height:"50px"}} name="addDet" onChange={this.handle}/>
                        </div>

                        <button>Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default AddEvent
