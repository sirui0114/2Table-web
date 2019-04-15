import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class RestaurantCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.resDetail.id
        }
      }
    
    
    componentDidMount() {
        //Fetch
        // Setstate
    }

    getReserveLink(id) {
        // generate link by id
        const link = "/reserve/" + id
        return link 
    }

    render() {
        const link = this.getReserveLink(this.state.id)
        return (
            <Card style={{ width: '18rem', margin: '1rem'}}>
            <Card.Img variant="top" src="https://i.loli.net/2019/04/15/5cb3e0210edb5.jpg" />
            <Card.Body>
            <Card.Title>{this.props.resDetail.resName}</Card.Title>
            <Card.Text>
                {this.props.resDetail.resDesc}
            </Card.Text>
            <Button variant="primary" href={link}>Reserve</Button>
            </Card.Body>
        </Card>
        );
    }
}
