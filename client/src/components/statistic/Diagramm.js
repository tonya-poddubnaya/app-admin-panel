import React, {Component} from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Diagramm extends Component {
    render() {
        const options = {
            theme: "light2",
            height: 250,
            title: {
                text: `${this.props.title} (${this.props.entries})`
            },
            axisX: {
                title: "Date"
            },
            axisY: {
                title: "Count"
            },
            data: [{
                type: "line",
                dataPoints: this.props.dataPoints
            }]
        };
        return (
            <div className="diagram-container">
                <CanvasJSChart
                    options={options}
                    onRef={ref => this.chart = ref}
                />
            </div>
        );
    }


}

export default Diagramm;