import WordMerge  from '../WordMerge.js';

it('renders correctly', () => {
  const wrapper = shallow(
    <WordMerge />
  )
  expect(wrapper).toMatchSnapshot();
})

it('renders correctly', () => {
  const wrapper = render(<WordMerge />)
  expect(wrapper).toMatchSnapshot();
})
