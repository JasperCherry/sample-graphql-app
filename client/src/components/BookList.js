import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { getBooksQuery, deleteBookMutation } from '../queries/queries'
import BookDetails from './BookDetails';


class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }


  deleteBook(id) {
    this.props.deleteBookMutation({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
  }


  displayBooks() {
    const data = this.props.getBooksQuery;

    if (data.loading) {
      return (<div>Loading books...</div>);
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={(e)=> {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
            <button
              className='delete-button'
              onClick={() => this.deleteBook(book.id)}
            >
              X
            </button>
          </li>
        );
      })
    }
  }


  render() {
    return (
      <div>
        <ul id='book-list'>
          {this.displayBooks()}
        </ul>
        <BookDetails
          bookId={this.state.selected}
        />
      </div>
    );
  }
}


export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(deleteBookMutation, { name: 'deleteBookMutation' }),
)(BookList);
