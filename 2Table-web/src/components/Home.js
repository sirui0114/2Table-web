import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { RestaurantCard } from './RestaurantCard';

var temp = [{"id": "1", "resName":"Restaurant 1", "resDesc": "Desc 1"},
{"id": "2", "resName":"Restaurant 2", "resDesc": "Desc 2"},
{"id": "3", "resName":"Restaurant 3", "resDesc": "Desc 3"},
{"id": "4", "resName":"Restaurant 4", "resDesc": "Desc 4"}]

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        resList : []
    }
  }

  componentDidMount() {
    //fetch
    //setState
    // 用ajax从数据库调餐馆的list，setState到resList里面，我这里用了temp测试

    const resList = temp
    this.setState({resList})
  }


  render() {
    return (
      <Container>
        <Row>
          {this.state.resList.map((restaurant)=>{
            return <RestaurantCard key={restaurant.id} resDetail={restaurant} />
          })}
        </Row>
      </Container>
    );
  }
}
