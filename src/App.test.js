import App from './App';
import Home from "./components/home/home.jsx"
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme'

describe('Tests de componente APP', () => {

	it('Deberia renderizarse sin Error', () => {

		const wrapper = shallow(<App />)

		expect(wrapper).toHaveLength(1);

	})

})
