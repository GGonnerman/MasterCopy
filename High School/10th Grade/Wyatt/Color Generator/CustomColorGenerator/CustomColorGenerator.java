import java.awt.Color;
import java.awt.Desktop;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JLabel;

public class CustomColorGenerator {
	ArrayList<Double> hrtz = new ArrayList<Double>( Arrays.asList(Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100) );
	ArrayList<Long> scaled = new ArrayList<>();
	ArrayList<Color> RGB = new ArrayList<>();
	
	public static void main(String[] Args) throws IOException {
		CustomColorGenerator colorMaker = new CustomColorGenerator();
		int scale = 100;
		Double max = colorMaker.hrtz.get(0);
		Double min = colorMaker.hrtz.get(0);
		for(int i = 1; i <colorMaker.hrtz.size(); i++){
			if(max < colorMaker.hrtz.get(i)){
				max = colorMaker.hrtz.get(i);
			}
			if(min > colorMaker.hrtz.get(i)){
				min = colorMaker.hrtz.get(i);
			}
		}
		Long scaleFactor = (long) (16777215 / max);
		for(int i = 0; i < colorMaker.hrtz.size(); i++){
			System.out.println("Color " + (i+1) + ": " + colorMaker.hrtz.get(i));
			if(colorMaker.hrtz.get(i) == max) { continue; }
			colorMaker.scaled.add((long) (colorMaker.hrtz.get(i) * scaleFactor));
		}
		
		String hex;
		for(int e = 0; e < colorMaker.scaled.size(); e++){
			hex = Long.toHexString(colorMaker.scaled.get(e));
			colorMaker.RGB.add(Color.decode("#" + hex));
		}
		BufferedImage AfterImagE = new BufferedImage(colorMaker.RGB.size()*scale, scale, BufferedImage.TYPE_INT_RGB);
		for(int i = 0; i < colorMaker.RGB.size()*scale; i++) {
			for(int q = 0; q < scale; q++) {
				AfterImagE.setRGB(i, q, colorMaker.RGB.get(i/scale).getRGB());
			}
		}
		File outputfile = new File("Audio.jpg");
		ImageIO.write(AfterImagE, "jpg", outputfile);

		Process process = new ProcessBuilder("mspaint","Audio.jpg").start();
		
		System.out.println("donezo");
	}
	}