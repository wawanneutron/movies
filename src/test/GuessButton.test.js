import { test, expect } from 'vitest'
import GuessAge from '../components/GuessAge.vue'
import { mount } from '@vue/test-utils'

test('Button clicked', async () => {
  expect(GuessAge).toBeTruthy()

  const wrapper = mount(GuessAge, {
    props: {
      title: 'Guess the users age'
    }
  })
  const verifyClick = await wrapper.get('button').trigger('click')
  expect(wrapper.vm.user.search).toEqual(null)
})
