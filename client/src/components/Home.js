import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Home extends Component {
    componentDidMount() {
        if (!localStorage.getItem('email')) {
            this.props.history.push("/signup")
        }
    }

    logout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        window.location.reload()


    }
    render() {
        return (
            <div>
                <button style={{ cursor: "pointer", textAlign: "right", border: "none", background: "transparent", height: "100%", color: "black", marginBottom: "20px", fontSize: "small", float: "right", marginRight: "8px", verticalAlign: "center", marginTop: 0, marginRight: "10px" }} onClick={this.logout}>Logout</button>

                <div style={{ width: "70%", margin: "auto", marginTop: "80px" }}>

                    <div style={{ fontSize: "large", color: "purple", textAlign: "center", marginBottom: "90px", clear: "both", overflow: "auto" }}>
                        Welcome  {localStorage.getItem('name')}

                    </div>

                    <div style={{ clear: "both", overflow: "auto" }}>
                        <Link to="/addevent" style={{ textDecoration: "none", height: "100%", color: "crimson", marginBottom: "20px", fontSize: "large", float: "left", marginRight: "8px", verticalAlign: "center" }}>Add Event +</Link>
                        <Link to="/events" style={{ textDecoration: "none", height: "100%", color: "crimson", marginBottom: "20px", fontSize: "large", float: "right", marginRight: "8px", verticalAlign: "center" }}>Events List</Link>

                    </div>


                </div>
            </div >
        )
    }
}

export default Home
