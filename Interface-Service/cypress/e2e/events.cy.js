describe('Events Home Page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type('test@test.com')
        cy.get('#password').type('Abcdef123?')
        cy.get('button').contains('Sign in').click()
    })

    describe('Create Event', () => {
        it('Should allow create  event', () => {
            cy.get('button').contains('Create Event').click()
            cy.get('header').contains('New Event')
            cy.get('button').contains('Create')
        })
    })

    describe('View Events', () => {
        it('Should events info', () => {
            cy.get('h1').contains('Events')
            cy.contains('Venue')
            cy.contains('Date')
            cy.contains('Duration')
            cy.contains('Available Tickets')
            cy.contains('Price')
        })

        it('Should allow book events', () => {
            cy.get('button').contains('Book Tickets').click()
            cy.contains('Checkout')
        })
    })


})
