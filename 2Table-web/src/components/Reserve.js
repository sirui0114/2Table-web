import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// 测试用数据，你把一下这些换成database里的数据
var temp = [{"id": "1", "resName":"Restaurant 1", "resDesc": "Desc 1"},
{"id": "2", "resName":"Restaurant 2", "resDesc": "Desc 2"},
{"id": "3", "resName":"Restaurant 3", "resDesc": "Desc 3"},
{"id": "4", "resName":"Restaurant 4", "resDesc": "Desc 4"}]

var tempTime = ["9:00", "9:30", "10:00", "10:30"]

const style = {
    height: '200px',
    width: '200px',
    margin: '2rem'
};

const button_style = {
    margin: '0.5rem'
};
  

export class Reserve extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        id: this.props.resId,
        resInfo: {}
    }
    this.handleReserve = this.handleReserve.bind(this);
  }


  componentDidMount() {
    //Fetch
    // Setstate
    // 用ajax把通过id把database里的餐馆数据用id调出来，我用了temp测试

    const resInfo = temp[this.props.resId-1]
    this.setState({resInfo})
  }

  getTimeSlot() {
      //获取timeslot，database里存了这个吗？如果有用id把它调出来，我这里用了tempTime测试
      return tempTime;
  }

  handleReserve(e) {
      // 用ajax检查capacity然后reserve餐馆，我直接写了alert测试用
      
    e.preventDefault();
    alert("sucess")
  }

  render() {
      const resInfo = this.state.resInfo
      const slots = this.getTimeSlot()
    // console.log(resInfo)
    return (
        <Container>
            <Row>
                <Col>
                {/* Col 1 for the Name and Picture of the Restaurant<br /> */}
                    <h1>{resInfo.resName}</h1>
                    <img src="https://i.loli.net/2019/04/15/5cb3e0210edb5.jpg" style={style} />
                </Col>
                <Col>
                    <h4>{resInfo.resDesc}</h4>
                    {slots.map((slot, index)=>{
                        return <Button key={index} variant="primary" style={button_style} onClick={this.handleReserve}>{slot}</Button>
                    })}
                {/* Col 2 for the Description and time slots of the Restaurant */}
                </Col>
            </Row>
        </Container>
    );
  }
}
