import {connect} from 'react-redux'
import SearchFormContainer from '../core/containers/search-form'
import ArticleListContainer from '../core/containers/article-list'
import '../assets/search.less'

class Index extends React.Component {
  render() {
    console.log(this.props.articles)
    return (
      <span className="layout">
        <span className={(this.props.articles.length > 0)?"query-bar":"query-form"}>
          <img src="/static/img/nyt.svg" className={(this.props.articles.length > 0)?"logo-small":"logo-mid"}/>
          <SearchFormContainer />
        </span>
        <span className="content">
          <ArticleListContainer />
        </span>
      </span>
    )
  }
}

const mapStateToProps = ({ 
  data:{articles}
}) => ({ 
  articles
})
const mapDispatchToProps = null //({ searchArticles })
export default connect(mapStateToProps, mapDispatchToProps)(Index)