import WordMergeModal from '../WordMergeModal'

it('renders correctly', () => {
  const wrapper = shallow(
    <WordMergeModal />
  )
  expect(wrapper.find('Button#closeButton').exists()).toEqual(true)
  expect(wrapper).toMatchSnapshot();
})
