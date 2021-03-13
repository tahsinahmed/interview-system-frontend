import { shallowMount } from '@vue/test-utils'
import ShowInterview from '@/components/Interview/ShowInterview.vue'

describe('ShowInterview.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(ShowInterview, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
