import React, {Component} from 'react';
import cookie from 'react-cookies';
import axios from "axios/index";
import SearchResults from './SearchResults';
import configs from '../../configs.js';
import Loading from '../Loading';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            isLoading: false,
            userData: [],
            fullData:''
        };
        this.inputChange = this.inputChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {
        if (!cookie.load('token')) {
            this.props.history.push('/');
        }
    }

    inputChange(e) {
        this.setState({[e.target.name]: e.target.value, userData: {}, fullData:false});
    }

    async submitSearch(e) {
        this.setState({isLoading: true});
        e.preventDefault();
        await axios.post(
            '/api/search',
            null,
            {
                params: {
                    searchField: this.state.searchField,
                    page: 0,
                    size: configs.pageSize
                }
            }
        )
            .then((response) => {
                // console.log(response);
                this.setState({isLoading: false});
                this.setState({userData: response.data});
                if(response.data.length < configs.pageSize){
                    console.log('Set fulldata');
                    this.setState({fullData:true})
                }else{
                    this.setState({fullData:false});
                }
            })
            .catch((err) => {
                console.log(err);
                // this.props.history.push('/not_found');
            });
    }

    render() {
        const {userData, isLoading, searchField, fullData} = this.state;
        console.log('Full Data', fullData);
        return (
            <div className="container">
                <form style={{marginTop: '10%'}} className='row' onSubmit={this.submitSearch}>
                    <input className='col s12 m4 offset-m4' autoFocus onChange={this.inputChange} name='searchField'
                           type='text'/>
                    <button className='btn' style={{margin: '10px'}}>Search</button>
                </form>
                {userData.length ? <SearchResults fullData={fullData} searchField={searchField} userData={userData}/> : <p>No results</p>}
                {isLoading && <Loading/>}
            </div>
        );
    }
}

export default Search;