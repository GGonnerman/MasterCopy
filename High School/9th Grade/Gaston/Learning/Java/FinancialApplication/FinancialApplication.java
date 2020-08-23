public class FinancialApplication {
	public static void printPayroll(String name,
			double hoursPerWeek,
			double hourlyPay,
			double federalTax,
			double stateTax) {
		System.out.println("Printing Payroll...");

		System.out.println("Employee Name: " + name);
		System.out.printf("Hours Worked: %.2f\n", hoursPerWeek);
			}

	public static void main(String[] args) {
		printPayroll("John Doe", 40, 9.75, .2, .09);
	}

}
