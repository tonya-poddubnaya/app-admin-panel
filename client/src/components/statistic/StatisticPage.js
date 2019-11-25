import React, {Component} from 'react';
import axios from "axios";
import cookie from "react-cookies";
import Diagramm from "./Diagramm";
import Loading from "../Loading";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import configs from '../../configs';


const today = new Date();
today.setDate(today.getDate() - configs.periodDays);
const todayMinus = today.toISOString().substr(0, 10);


// const TYPES = ['NEW_USER_COUNT', 'MESSAGE_SENT', 'MESSAGE_RECEIVED', 'PURCHASE_CONFIRMED'];


class StatisticPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: todayMinus,
            endDate: new Date().toJSON().slice(0, 10),
            interval: 'DAILY',
            isLoading: true,
            error: '',
            allDone: 0,
            NEW_USER_COUNT: [],
            totalUsers: 0,
            MESSAGE_SENT: [],
            totalSent: 0,
            MESSAGE_RECEIVED: [],
            totalReceived: 0,
            PURCHASE_CONFIRMED: [],
            totalPurchase: 0
        };
        this.getStatistic = this.getStatistic.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    componentDidMount() {
        if (!cookie.load('token')) {
            this.props.history.push('/');
        }

        this.sendRequest();
    }


    async sendRequest() {
        this.setState({error: ''});
        const fetchNewUser = () => {
            return axios.post(
                '/api/statistics',
                null,
                {
                    params: {
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        statisticRequestType: 'NEW_USER_COUNT',
                        statisticInterval: this.state.interval
                    }
                }
            )
                .then((response) => {
                    const a = [];
                    if (response.data.statisticIntervalResponse) {
                        response.data.statisticIntervalResponse.map(object => {
                            const start = object.startDate.slice(0, 10);
                            a.push({label: start, y: object.result});
                        });
                        this.setState({NEW_USER_COUNT: a, totalUsers:response.data.totalEntries, isLoading: false});
                    } else {
                        this.setState({error: response.data.message});
                    }
                })
        };

        const fetchMessageSent = () => {
            return axios.post(
                '/api/statistics',
                null,
                {
                    params: {
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        statisticRequestType: 'MESSAGE_SENT',
                        statisticInterval: this.state.interval
                    }
                }
            ).then((response) => {
                const b = [];
                if (response.data.statisticIntervalResponse) {
                    response.data.statisticIntervalResponse.map(object => {
                        const start = object.startDate.slice(0, 10);
                        b.push({label: start, y: object.result});
                    });
                    this.setState({MESSAGE_SENT: b, totalSent:response.data.totalEntries, isLoading: false});
                } else {
                    this.setState({error: response.data.message});
                }
            })
        };
        const fetchMessageReceived = () => {
            return axios.post(
                '/api/statistics',
                null,
                {
                    params: {
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        statisticRequestType: 'MESSAGE_RECEIVED',
                        statisticInterval: this.state.interval
                    }
                }
            ).then((response) => {
                const c = [];
                if (response.data.statisticIntervalResponse) {
                    response.data.statisticIntervalResponse.map(object => {
                        const start = object.startDate.slice(0, 10);
                        c.push({label: start, y: object.result});
                    });
                    this.setState({MESSAGE_RECEIVED: c, totalReceived:response.data.totalEntries, isLoading: false});
                } else {
                    this.setState({error: response.data.message});
                }
            })
        };
        const fetchPurchaseConfirmed = () => {
            return axios.post(
                '/api/statistics',
                null,
                {
                    params: {
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        statisticRequestType: 'PURCHASE_CONFIRMED',
                        statisticInterval: this.state.interval
                    }
                }
            ).then((response) => {
                const d = [];
                if (response.data.statisticIntervalResponse) {
                    response.data.statisticIntervalResponse.map(object => {
                        const start = object.startDate.slice(0, 10);
                        d.push({label: start, y: object.result});
                    });
                    this.setState({PURCHASE_CONFIRMED: d, totalPurchase:response.data.totalEntries, isLoading: false});
                } else {
                    this.setState({error: response.data.message});
                }
            })
        };
        this.setState({allDone: 0, error: ''});
        await axios.all([fetchNewUser(), fetchMessageSent(), fetchMessageReceived(), fetchPurchaseConfirmed()])
            .then(responseArr => {
                this.setState({isLoading: false});
                console.log(responseArr);
            });
    }


    getStatistic(e) {
        e.preventDefault();
        this.setState({isLoading: true});
        this.sendRequest();
    }

    selectChange(e) {
        this.setState({interval: e.target.value});
    }

    changeStartDate(date) {
        this.setState({startDate: date});
    }

    changeEndDate(date) {
        this.setState({endDate: date});
    }

    renderContent() {
        return (
            <div>
                <div>
                    <Diagramm dataPoints={this.state.NEW_USER_COUNT} entries={this.state.totalUsers} title={'NEW USER COUNT'}/>
                    <Diagramm dataPoints={this.state.MESSAGE_SENT} entries={this.state.totalSent} title={'MESSAGE SENT'}/>
                    <Diagramm dataPoints={this.state.MESSAGE_RECEIVED} entries={this.state.totalReceived} title={'MESSAGE RECEIVED'}/>
                    <Diagramm dataPoints={this.state.PURCHASE_CONFIRMED} entries={this.state.totalPurchase} title={'PURCHASE CONFIRMED'}/>
                </div>
            </div>
        );
    }

    render() {
        const {isLoading, startDate, endDate, interval, error} = this.state;
        return (
            <>
                <form
                    style={{margin: '20px'}}
                    id="statisticForm"
                    className="row valign-wrapper"
                    onSubmit={this.getStatistic}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-evenly">
                            <KeyboardDatePicker
                                autoOk
                                disableToolbar
                                disableFuture
                                variant="inline"
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="startDate"
                                label="Start Date"
                                value={startDate}
                                onChange={this.changeStartDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                autoOk
                                disableToolbar
                                disableFuture
                                variant="inline"
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="endDate"
                                label="End Date"
                                value={endDate}
                                onChange={this.changeEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <div className="input-field col l2 s12 m4">
                        <select className="browser-default" defaultValue={interval} onChange={this.selectChange}>
                            <option value="HOURLY">Hourly</option>
                            <option value="DAILY">Daily</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="MONTHLY">Monthly</option>
                            <option value="YEARLY">Yearly</option>
                        </select>
                    </div>
                    <button className="btn" type="submit">Submit</button>
                </form>
                {error && <p className="red-text">{error}</p>}
                {isLoading ? <Loading/> : this.renderContent()}
            </>
        );
    }
}

export default StatisticPage;