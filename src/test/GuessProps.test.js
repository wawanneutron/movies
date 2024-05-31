import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

// import component
import GuessAge from '../components/GuessAge.vue'

test('Testing component props', async () => {
  expect(GuessAge).toBeTruthy()

  const wrapper = mount(GuessAge, {
    props: {
      title: 'Guess the user age'
    }
  })

  expect(wrapper.text()).toContain('Guess the user age')
})
