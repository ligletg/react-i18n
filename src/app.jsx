import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-ui-library';
import {i18n} from '../i18n/translate';
import {IntlProvider, intlShape, injectIntl, FormattedMessage, FormattedNumber, FormattedDate} from 'react-intl';

const ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

const ProductRow = React.createClass({
    render: function() {
        const name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>
                  <FormattedNumber value={this.props.product.price} style="currency" currency="USD" />
                </td>
                <td>
                  <FormattedDate
                    value={new Date()}
                    day="numeric"
                    month="long"
                    year="numeric" />
                </td>
            </tr>
        );
    }
});

const ProductTable = React.createClass({
  propTypes: {
    t: React.PropTypes.func
  },
  render: function() {
    const rows = [];
    let lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
            return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));

    return (
      <table>
        <thead>
          <tr>
            <th>{this.props.t('name', this)}</th>
            <th>{this.props.t('price', this)}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

const SearchBar = React.createClass({
  propTypes: {
    t: React.PropTypes.func
  },
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder={this.props.t("search", this)}
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
              type="checkbox"
              checked={this.props.inStockOnly}
              ref="inStockOnlyInput"
              onChange={this.handleChange}
          />
          {' '}
          {this.props.t("showStock", this)}
        </p>
      </form>
    );
  }
});

const DefaultFilterMixin = {
  getInitialState: function () {
    return {
      filterText: '',
      inStockOnly: false
    };
  }
};

const FilterableProductTable = React.createClass({
    mixins: [DefaultFilterMixin, i18n],
    handleUserInput: function(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },

    render: function() {
      return (
        <div>
          <SearchBar
            t={this.t}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onUserInput={this.handleUserInput}
          />
          <ProductTable
            t={this.t}
            products={this.props.products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
          <Button type="primary" text={this.t("save", this)}/>
        </div>
      );
    }
});

const PRODUCTS = [
  {category: 'Sporting Goods', price: '49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '199.99', stocked: true, name: 'Nexus 7'}
];

const App = React.createClass({
    mixins: [i18n],

    render: function () {
      // const {formatMessage} = this.props.intl;
      // const greetingsTranslated = this.t('greetings');
      // console.log(greetingsTranslated);

      return (
        <FilterableProductTable products={PRODUCTS} />
      );

      // return (
      //   <div>
      //     {formatMessage(greetingsTranslated)}
      //   </div>
      // );
    }
});

App.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(App);