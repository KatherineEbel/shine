# frozen_string_literal: true

class CustomersController < ApplicationController
  PAGE_SIZE = 10

  def index
    @page = (params[:page] || 0).to_i
    @customers = customers
    respond_to do |format|
      format.html {}
      format.json do
        render json: { customers: @customers }
      end
    end
  end

  private

  def customers
    return [] unless params[:keywords].present?
    @keywords = params[:keywords]
    customer_search_term = CustomerSearchTerm.new(@keywords)
    Customer.where(
      customer_search_term.where_clause,
      customer_search_term.where_args
    )
            .order(customer_search_term.order)
            .offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
  end
end
