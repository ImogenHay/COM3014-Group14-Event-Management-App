describe('Events Home Page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type('test@test.com')
        cy.get('#password').type('Abcdef123?')
        cy.get('button').contains('Sign in').click()
    })

    describe.skip('Create Event', () => {

        beforeEach(() => {
            cy.contains('Login').click()
        })

        it('Should create valid event', () => {
            cy.get('h2').contains('Sign in to your account')
        })
    })

    describe('View Events', () => {
        it('Should display all events', () => {
            cy.get('h2').contains('Events')
        })

        it('Should display all events', () => {
            cy.get('h2').contains('Events')
        })
    })


})
