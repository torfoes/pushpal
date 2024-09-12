require "application_system_test_case"

class DuesTest < ApplicationSystemTestCase
  setup do
    @due = dues(:one)
  end

  test "visiting the index" do
    visit dues_url
    assert_selector "h1", text: "Dues"
  end

  test "should create due" do
    visit dues_url
    click_on "New due"

    fill_in "Amount", with: @due.amount
    fill_in "Date", with: @due.date
    fill_in "Payment", with: @due.payment_id
    fill_in "Semester", with: @due.semester
    fill_in "Status", with: @due.status
    fill_in "User", with: @due.user
    click_on "Create Due"

    assert_text "Due was successfully created"
    click_on "Back"
  end

  test "should update Due" do
    visit due_url(@due)
    click_on "Edit this due", match: :first

    fill_in "Amount", with: @due.amount
    fill_in "Date", with: @due.date
    fill_in "Payment", with: @due.payment_id
    fill_in "Semester", with: @due.semester
    fill_in "Status", with: @due.status
    fill_in "User", with: @due.user
    click_on "Update Due"

    assert_text "Due was successfully updated"
    click_on "Back"
  end

  test "should destroy Due" do
    visit due_url(@due)
    click_on "Destroy this due", match: :first

    assert_text "Due was successfully destroyed"
  end
end
