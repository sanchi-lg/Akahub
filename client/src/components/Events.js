import React, { Component } from 'react'
import axios from 'axios'


export class Events extends Component {

    constructor(props) {
        super(props)

        this.state = {
            events: []
        }
    }


    componentDidMount() {
        if (!localStorage.getItem('email')) {
            this.props.history.push("/signup")
        }
        else {
            axios.get(`http://localhost:9000/events/${localStorage.getItem('email')}`)
                .then(res => {

                    this.setState({ events: res.data })
                })
                .catch(err => { console.log(err); })
        }
    }

    render() {

        return (
            <table >
                <tr>
                    <th>S.No.</th>
                    <th style={{ width: "300px" }}>Event</th>
                    <th >Description</th>
                </tr>

                { this.state.events.map((i, ind) =>
                    <tr>
                        <td>{ind + 1}</td>

                        <td style={{ color: "rgb(8,8,1)" }}>{i.event}</td>
                        <td>{i.addDet}</td>

                    </tr>
                )}
            </table>
        )
    }
}

export default Events
