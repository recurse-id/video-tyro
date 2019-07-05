import React from 'react';
import {Form, Icon, Image, Input, Menu} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../../assets/home-logo-icon-0-128.png'
import './HeaderNav.scss';

export class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  render() {
    return (
      <Menu borderless className='top-menu' fixed='top'>

        <Menu.Menu className='nav-container'>
          <Menu.Item header className='logo'>
            <Link to='/'><Image src={logo} size="mini"/></Link>
          </Menu.Item>
          <Menu.Item className='search-input'>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <Input placeholder='Search'
                       size='small'
                       action='Go'
                       value={this.state.query}
                       onChange={this.onInputChange}
                />
              </Form.Field>
            </Form>
          </Menu.Item>
          <Menu.Item>
            <Link to='/catalog'>Catalog</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }

  onInputChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  onSubmit = () => {
    const escapedSearchQuery = encodeURI(this.state.query);
    this.props.history.push(`/results?search_query=${escapedSearchQuery}`);
  };
}

export default withRouter(HeaderNav);
