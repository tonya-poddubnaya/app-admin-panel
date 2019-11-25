import React, {Component} from 'react';
import axios from "axios";
import cookie from "react-cookies";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import TopStatisticTable from "./TopStatisticTable";

const today = new Date();
today.setDate(today.getDate() + 1);
const TODAY = new Date().toJSON().slice(0, 10);
const NEXT_DAY = today.toISOString().substr(0, 10);


class TopStatistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: TODAY,
            endDate: NEXT_DAY,
            OUTGOING: {},
            INCOMING: {},
            isLoadingOutgoing: true,
            isLoadingIncoming: true,
            error: ''
        };
    }

    async componentDidMount() {
        if (!cookie.load('token')) {
            this.props.history.push('/');
        }
        this.sendRequest();
    }

    dateToJSON = (date) => {
        function addZ(n) {
            return (n<10? '0' : '') + n;
        }
        return new Date(date).getFullYear() + '-' +
            addZ(new Date(date).getMonth() + 1) + '-' +
            addZ(new Date(date).getDate());
    };

    sendRequest = () => {
        const {startDate, endDate} = this.state;
        if (
            sessionStorage.outgoing &&
            sessionStorage.incoming &&
            TODAY === this.dateToJSON(startDate) &&
            NEXT_DAY === this.dateToJSON(endDate)
        ) {
            this.setState({
                OUTGOING: JSON.parse(sessionStorage.outgoing),
                isLoadingOutgoing: false,
                INCOMING: JSON.parse(sessionStorage.incoming),
                isLoadingIncoming: false
            });
        } else {
            this.setState({error: ''});
            const fetchOutgoing = () => {
                return axios.post(
                    '/api/statistics/top',
                    null,
                    {
                        params: {
                            startDate: startDate,
                            endDate: endDate,
                            messageType: 'OUTGOING',
                        }
                    }
                )
                    .then((response) => {
                        this.setState({OUTGOING: response.data, isLoadingOutgoing: false});
                        if(TODAY === this.dateToJSON(startDate) &&
                            NEXT_DAY === this.dateToJSON(endDate)
                        ) {
                            let out = JSON.stringify(response.data);
                            sessionStorage.setItem('outgoing', out);
                        }
                    })
            };

            const fetchIncoming = () => {
                return axios.post(
                    '/api/statistics/top',
                    null,
                    {
                        params: {
                            startDate: startDate,
                            endDate: endDate,
                            messageType: 'INCOMING',
                        }
                    }
                ).then((response) => {
                    this.setState({INCOMING: response.data, isLoadingIncoming: false});
                    if(TODAY === this.dateToJSON(startDate) &&
                        NEXT_DAY === this.dateToJSON(endDate)
                    ) {
                        let inc = JSON.stringify(response.data);
                        sessionStorage.setItem('incoming', inc);
                    }
                })
            };
            this.setState({error: ''});
            axios.all([fetchOutgoing(), fetchIncoming()])
                .then(responseArr => {
                    console.log('RESPONSE ARRAY: ', responseArr);
                });
        }
    };

    getStatistic = (e) => {
        e.preventDefault();
        if (this.getDifference() <= 7) {
            this.setState({isLoadingOutgoing: true, isLoadingIncoming: true});
            this.sendRequest();
        } else {
            this.setState({error: 'The difference between dates should not be more than 7 days'});
        }
    };

    changeStartDate = (date) => {
        this.setState({startDate: date});
    };

    changeEndDate = (date) => {
        this.setState({endDate: date});
    };

    getDifference = () => {
        function dateDiffInDays(a, b) {
            const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }

        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        const a = new Date(this.state.startDate),
            b = new Date(this.state.endDate);
        return dateDiffInDays(a, b);
    };

    renderContent = () => {
        return (
            <div>
                <TopStatisticTable
                    OUTGOING={this.state.OUTGOING}
                    INCOMING={this.state.INCOMING}
                    isLoadingOutgoing={this.state.isLoadingOutgoing}
                    isLoadingIncoming={this.state.isLoadingIncoming}
                />
            </div>
        );
    };

    render() {
        const {startDate, endDate, error} = this.state;
        return (
            <div>
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
                    <button className="btn" type="submit">Submit</button>
                </form>
                {error && <p className="red-text">{error}</p>}
                {this.renderContent()}
            </div>
        );
    }
}

export default TopStatistic;