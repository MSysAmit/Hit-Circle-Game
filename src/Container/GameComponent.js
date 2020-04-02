/**
 * This component is written by Amit Kumar Burnwal on 02/04/2020.
 * This is used for playing hit the circle game Screen"
 * */


import React, {Component} from 'react';

/** tableRow and tableData objects are created for Table Row and Table data **/

const tableRow = [{ id: 'r1', row: 1}, { id: 'r2', row: 2}, { id: 'r3', row: 3}, { id: 'r4', row: 4}, { id: 'r5', row: 5}, { id: 'r6', row: 6}];
const tableData = [{ id: 'c1', col: 1}, { id: 'c2', col: 2}, { id: 'c3', col: 3}, { id: 'c4', col: 4}, { id: 'c5', col: 5}, { id: 'c6', col: 6}];


class GameComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            playStatus: false,
            totalCircle: 36,
            currentPos: 0,
            totalHits: 0
        };
        this.handleChange=this.handleChange.bind(this);
        this.handlePlay=this.handlePlay.bind(this);
        this.handleStop=this.handleStop.bind(this);
        this.random=this.random.bind(this);
        this.launch=this.launch.bind(this);
        this.clrCircle = this.clrCircle.bind(this)
    }

    /** function for clear selected circle **/
    clrCircle() {
        for (let k = 0; k < document.dmz.elements.length; k++)
            document.dmz.elements[k].checked = false;
    }

    /** function for create random id for selecting circle **/
    random() {
        return (Math.floor(Math.random() * 100 % this.state.totalCircle));
    }

    /** function for further random auto-selection of circle if user hits the correct circle then score increase by 1
     * or hits of incorrect circle then score decrease by 1.
     * **/
    handleChange(col, row){
        debugger;
        let selectedCircle = col + (row - 1) * 6;
        if(this.state.playStatus === false){
            this.clrCircle();
            return;
        }
        if(this.state.currentPos !== selectedCircle){
            this.setState({
                totalHits:  this.state.totalHits - 1
            })
            document.dmz.elements[selectedCircle-1].checked = false;
        }
        else{
            this.setState({
                currentPos: selectedCircle,
                totalHits:  this.state.totalHits + 1
            });
            document.dmz.elements[selectedCircle-1].checked = false;
            this.launch();
        }

    }

    /** function for handling auto selection of circle **/
    launch() {
        let launched = false;
        while (!launched) {
            let mynum = this.random();
            if (mynum !== this.state.currentPos) {
                document.dmz.elements[mynum].checked = true;
                this.setState({
                    currentPos: mynum + 1
                })
                launched = true;
            }
        }
    }

    /** function for handle play button **/
    handlePlay() {
        if (this.state.playStatus) {
            this.handleStop();
            return;
        }
        this.setState({
            playStatus: true,
            totalHits: 0
        })
        this.clrCircle();
        this.launch();
    }

    /** function for handle pause button **/
    handleStop(){
        this.setState({
            playStatus: false,
            totalHits: 0
        })
        this.clrCircle();
        alert('Game Over.\nYour score is:  ' + this.state.totalHits);
    }

    /** render the component on the screen **/
    render(){
        const {totalHits} = this.state;
        return(
            <div>
                <h4>Hit the circle</h4>
                <p>Test your skill how many circle you can hit?</p>
                <div>
                    <span>Score</span>
                    <input value={totalHits}/>
                </div>
                <br/>
                <form name="dmz">
                <table>
                    <tbody>
                    {
                        tableRow.map((item) =>(
                          <tr key={item.id}>
                              {
                                  tableData.map((td)=>(
                                    <td align="center" valign="center" key={td.col+item.row}><input type="radio" id={td.col + (item.row - 1) * 6} onClick={() => this.handleChange(td.col, item.row)}/></td>
                                  ))
                              }
                          </tr>
                        ))
                    }
                    </tbody>
                </table>
                </form>
                <button onClick={this.handlePlay}>Play</button>
                <button onClick={this.handleStop}>Stop</button>
            </div>
        )
    }
}

export default GameComponent;
