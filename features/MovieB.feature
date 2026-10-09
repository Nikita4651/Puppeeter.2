Feature: Cinema booking automated tests 


Scenario: NFS movie booking 

      Given user navigated to the cinema page
      When user clicks the day button
      When user clicks the session time 20:00
      When user selects the seat
      When user clicks the Book button
      Then user sees the course suggested "ВЫ ВЫБРАЛИ БИЛЕТЫ:"

Scenario: should prevent booking for 'Ведьмак' when no standard seats are free
      Given user navigated to the cinema page
      When user clicks the saturday button
      When user clicks the session time
      When user clicks the booked tickets link
      Then booking button is disabled