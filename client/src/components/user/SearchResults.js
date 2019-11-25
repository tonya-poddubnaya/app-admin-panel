import React, {Component} from 'react';
import axios from "axios/index";
import configs from '../../configs.js';
import Loading from '../Loading';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false , page: 1, fullData:this.props.fullData};
        this.onLoadMore = this.onLoadMore.bind(this);
    }


    async onLoadMore(e) {
        e.preventDefault();
        this.setState({isLoading: true});
        await axios.post(
            '/api/search',
            null,
            {
                params: {
                    searchField: this.props.searchField,
                    page: this.state.page,
                    size: configs.pageSize
                }
            }
        )
            .then((response) => {
                this.setState({isLoading: false});
                response.data.map(user => (this.props.userData.push(user)));
                console.log(response.data.length);
                if(response.data.length < configs.pageSize){
                    console.log('END');
                    this.setState({fullData:true})}
            })
            .catch((err) => {
                this.setState({fullData:true});
            });
        this.setState({page:this.state.page+1});
    }

    render() {
        const {isLoading, fullData} = this.state;
        console.log('FullData SearchField', fullData);
        const userData = this.props.userData;
        const results = Object.keys(userData).slice(0, this.state.limit).map((info, i) => (
            <a key={userData[info].id} href={`/user/${userData[info].id}`}
               className='collection-item'>{i + 1}. {userData[info].username}</a>
        ));
        return (
            <div className="container">
                <div className="collection">
                    {results}
                </div>
                {isLoading && <Loading/> }
                {!fullData && <p style={{marginBottom: '2%'}} className='btn' onClick={this.onLoadMore}>Load More</p>}
            </div>
        );
    }
}

export default SearchResults;