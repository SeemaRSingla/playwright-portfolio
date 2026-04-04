/**
 * Test Users for Sauce Labs Demo
 * https://www.saucedemo.com/
 */

export const TEST_USERS = {
  standard_user: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard test user with all features enabled',
  },
  locked_out_user: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'User account that is locked out',
  },
  problem_user: {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'User with visual glitches on products',
  },
  performance_glitch_user: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'User with simulated performance issues',
  },
  error_user: {
    username: 'error_user',
    password: 'secret_sauce',
    description: 'User that experiences errors during checkout',
  },
  visual_user: {
    username: 'visual_user',
    password: 'secret_sauce',
    description: 'User with visual differences',
  },
}

export const VALID_CHECKOUT_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
}

export const INVALID_CHECKOUT_DATA = {
  firstName: '',
  lastName: '',
  postalCode: '',
}
