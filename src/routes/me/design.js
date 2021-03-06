import { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { WhiteSpace, Loading, Card, Skills, Tools } from '../../components';
import action from '../../utils/action';
import './design.scss';

@connect(({ resume, loading }) => ({
  vdskills: resume.vdskills,
  loading: loading.effects['resume/get'],
}))
export default class extends Component {
  static defaultProps = {
    vdskills: {
      main: [],
      tools: [],
    },
    loading: true,
  };

  config = {
    navigationBarTitleText: 'Design Skills',
  };

  componentDidMount = () => {
    this.props.dispatch(action('resume/get'));
  };

  onShareAppMessage = () => {
    return {
      title: 'Design Skills - Resume',
      path: 'routes/me/design',
      imageUrl: '/asset/share-projects.png',
    };
  };

  render() {
    const { loading, vdskills } = this.props;
    return (
      <View className="design">
        <Card padding>{loading ? <Loading /> : <Skills data={vdskills.main} />}</Card>
        <WhiteSpace />
        <Card title="Productivity Tools">
          <View className="list">
            {loading ? <Loading /> : vdskills.tools.map((item, i) => <Tools data={item} key={i} />)}
          </View>
        </Card>
        <WhiteSpace footer />
      </View>
    );
  }
}
