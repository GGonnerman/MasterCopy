import java.io.*;
import java.util.*;
import java.text.DecimalFormat;

public class Solution {

    private static DecimalFormat twoPlaces = new DecimalFormat(".#");

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int amtOfValues = scan.nextInt();
        int[] values = new int[amtOfValues];
        for (int i = 0; i < amtOfValues; i++) {
            values[i] = scan.nextInt();
        }
        System.out.println(getStandardDeviation(values));
    }

    private static double getStandardDeviation(int[] valueList) {
        double numerator = 0;
        double mean = getMean(valueList);
        for (int i: valueList) {
            numerator += Math.pow(i - mean, 2);
        }
        double valueToBeRooted = numerator / valueList.length;
        return Double.parseDouble(twoPlaces.format(Math.sqrt(valueToBeRooted)));
    }

    private static double getMean(int[] valueList) {
        double sumOfValues = 0;
        for (int i: valueList) {
            sumOfValues += i;
        }
        return sumOfValues / valueList.length;
    }
}