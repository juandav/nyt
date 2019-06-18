import React, {Component} from 'react'
import { Form, Icon, Input, Select, Button } from 'antd'
import {connect} from 'react-redux'
import {searchArticles} from '../store/articles/actions'
import {TYPES_OF_MATERIALS} from '../environments'

const {Option} = Select
const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

class SeacrhFormContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.searchArticles({
          type_of_material: values.typeOfMaterial, 
          query: values.keywords, 
          page: 0,
          type: "new"
        })
      }
    })
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    // Only show error after a field is touched.
    const keywordsError = isFieldTouched('keywords') && getFieldError('keywords')
    const typeOfMaterialError = isFieldTouched('typeOfMaterial') && getFieldError('typeOfMaterial')

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={keywordsError ? 'error' : ''} help={keywordsError || ''}>
          {getFieldDecorator('keywords', {
            rules: [{ required: true, message: 'Please input your keyword!' }],
          })(
            <Input
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Keywords"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={typeOfMaterialError ? 'error' : ''} help={typeOfMaterialError || ''}>
          {getFieldDecorator('typeOfMaterial', {
              rules: [{ required: true, message: 'Please select your type of material!' }],
            })(
              <Select style={{width: "315px"}} placeholder="Please select a type of material">
                {TYPES_OF_MATERIALS.map(key => <Option key={key} value={key}>{key}</Option>)}
              </Select>,
            )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Search
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
const mapStateToProps = ({ meta: {page} }) => ({ page })
const mapDispatchToProps = ({ searchArticles })

export default Form.create({ 
  name: 'search_form' 
})(
  connect(mapStateToProps, mapDispatchToProps)(SeacrhFormContainer)
)