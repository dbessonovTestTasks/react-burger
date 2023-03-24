/// <reference types="cypress" />
const loginInfo = require('../fixtures/loginInfo.json');

describe('create order success path', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open and close modal', function () {
    cy.get('[class^=burger-ingredient_ingredientCard]').first().click();
    cy.get('[class^=modal_modal]').contains('Детали ингредиента');
    cy.get('[class^=modal_header]').find('div').first().click();   
  });

  it('create order', function () {
    cy.get('[class^=burger-constructor_totalContainer]').find('button').first().as('createOrderButton');
    cy.get('[class^=burger-ingredient_ingredientCard]').first().trigger('dragstart');
    cy.get('[class^=burger-constructor_ingidientsContainer]').first().trigger('drop');
    cy.get('@createOrderButton').click();
    cy.get('[class^=user-login_container]').find('input[name="email"]').type(loginInfo.login);
    cy.get('[class^=user-login_container]').find('input[name="password"]').type(loginInfo.password);
    cy.get('[class^=user-login_container]').find('button').first().click();
    cy.get('@createOrderButton').click();
    cy.get('[class^=modal_modal', { timeout: 20000 }).contains('идентификатор заказа');
    cy.get('[class^=modal_header]').find('div').first().click();
  });
}); 