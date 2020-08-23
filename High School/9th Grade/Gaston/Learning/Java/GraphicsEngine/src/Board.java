import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.concurrent.ThreadLocalRandom;

class Board extends JPanel implements ActionListener {

    private final int B_WIDTH = 350;
    private final int B_HEIGHT = 350;

    private final Cube[] cubeList = new Cube[10];
    private int visibleCount = 1;


    Board() {
        initBoard();
    }

    private void initBoard() {

        int DELAY = 1;
        int width = 50;
        int height = 50;

        setBackground(Color.BLACK);
        setPreferredSize(new Dimension(B_WIDTH, B_HEIGHT));

        for (int i = 0; i < cubeList.length; i++) {
            int INITIAL_X = ThreadLocalRandom.current().nextInt(0, B_WIDTH + 1 - width);
            int INITIAL_Y = ThreadLocalRandom.current().nextInt(0, B_HEIGHT + 1 - height);

            cubeList[i] = new Cube(INITIAL_X, INITIAL_Y, width, height);
        }

        Timer timer = new Timer(DELAY, this);
        timer.start();

    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        drawBall(g);
    }

    private void drawBall(Graphics g) {

        g.setColor(Color.WHITE);
        for (int i = 0; i < visibleCount; i++) {
            cubeList[i].draw(g);
        }
        Toolkit.getDefaultToolkit().sync();

    }

    @Override
    public void actionPerformed(ActionEvent e) {
        for (int i = 0; i < visibleCount; i++) {

            cubeList[i].move();

            if (cubeList[i].getY() > B_HEIGHT - cubeList[i].getHeight()) {
                cubeList[i].touchGroundEvent();
            }
            if (cubeList[i].getX() < 0 || cubeList[i].getX() > B_WIDTH - cubeList[i].getWidth()) {
                cubeList[i].hitWallEvent();
            }

        }

        repaint();

        if (visibleCount < cubeList.length) {
            visibleCount++;
        }

    }

}
