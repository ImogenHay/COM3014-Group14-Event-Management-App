describe('Authentication', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  describe('Sign Up Page', () => {
    it('Should display sign up page by default', () => {
      cy.get('h2').contains('Sign up')
    })

    it('Should require email', () => {
      cy.get('#email')
      cy.get('button').contains('Sign up').click()
      cy.contains('Email is required')
    })

    it('Should validate email', () => {
      cy.get('#email').type('test@test')
      cy.get('button').contains('Sign up').click()
      cy.contains('Invalid email format')
    })

    it('Should require password', () => {
      cy.get('#email').type('test@test.com')
      cy.get('#password')
      cy.get('button').contains('Sign up').click()
      cy.contains('Password is required')
    })

    it('Should validate password', () => {
      cy.get('#email').type('test@test.com')
      cy.get('#password').type('abc123')
      cy.get('button').contains('Sign up').click()
      cy.contains('Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character')
    })

    it('Should login after valid signup', () => {
      cy.get('#email').type('test@test.com')
      cy.get('#password').type('Abcdef123?')
      cy.get('button').contains('Sign up').click()
    })
  })

  describe('Sign In Page', () => {

    beforeEach(() => {
      cy.contains('Login').click()
    })

    it('Should display sign in page when Login link clicked', () => {
      cy.get('h2').contains('Sign in to your account')
    })

    it('Should require email', () => {
      cy.get('#email')
      cy.get('button').contains('Sign in').click()
      cy.contains('Email is required')
    })

    it('Should validate email', () => {
      cy.get('#email').type('test@test')
      cy.get('button').contains('Sign in').click()
      cy.contains('Invalid email format')
    })

    it('Should require password', () => {
      cy.get('#email').type('test@test.com')
      cy.get('#password')
      cy.get('button').contains('Sign in').click()
      cy.contains('Password is required')
    })

    it('Should validate password', () => {
      cy.get('#email').type('test@test.com')
      cy.get('#password').type('abc123')
      cy.get('button').contains('Sign in').click()
      cy.contains('Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character')
    })

    it('Should login after valid signup', () => {
      cy.get('#email').type('test@test.com')
      cy.get('#password').type('Abcdef123?')
      cy.get('button').contains('Sign in').click()
    })
  })

  describe('Logout Button', () => {

    beforeEach(() => {
      cy.contains('Login').click()
      cy.get('#email').type('test@test.com')
      cy.get('#password').type('Abcdef123?')
      cy.get('button').contains('Sign in').click()
    })

    it('Should logout user and redirect to sign in page', () => {
      cy.get('button').contains('Log Out').click()
      cy.get('h2').contains('Sign in to your account')
    })
  })
})
