import java.awt.*;
import java.util.concurrent.ThreadLocalRandom;

class Cube {
    private double x;
    private double y;
    private final int width;
    private final int height;
    private int seconds = 0;

    private boolean movingUp = false;
    private double gravityPullOnObject = 0;
    private double forceUpward = 0;
    private double xVelocity = ThreadLocalRandom.current().nextInt(-5, 5);
    private final Color c;

    Cube(double x, double y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        c = new Color(ThreadLocalRandom.current().nextInt(0, 254), ThreadLocalRandom.current().nextInt(0, 254), ThreadLocalRandom.current().nextInt(0, 254));
    }

    private void calculatePull() {
        gravityPullOnObject = 9.8 * seconds;
    }

    private void calculateForceUp() {
        forceUpward = gravityPullOnObject * 0.8;
    }

    private double calculateMovement() {
        calculatePull();
        return gravityPullOnObject - forceUpward;
    }

    private void addTime() {
        seconds++;
    }

    private void clearTime() {
        seconds = 0;
    }

    void move() {

        addTime();
        applyFriction();

        x += this.xVelocity / 10;
        y += calculateMovement() / 5000;

        if (calculateMovement() > 0 && movingUp) {
            movingUp = false;
            reachedPeak();
        } else if (calculateMovement() < 0 && !movingUp) {
            movingUp = true;
        }

    }

    void hitWallEvent() {
        this.xVelocity *= -1;
    }

    private void applyFriction() {
        if (y > 299) {
            if (Math.abs(this.xVelocity) < 0.01) {
                this.xVelocity = 0;
            } else {
                this.xVelocity *= 0.995;
            }
        }
    }


    void touchGroundEvent() {

        calculateForceUp();
        gravityPullOnObject = 0;
        clearTime();
        y = 299.9;

    }

    private void reachedPeak() {
        clearTime();
        forceUpward = 0;
    }


    double getX() {
        return x;
    }

    int getWidth() {
        return width;
    }

    int getHeight() {
        return height;
    }

    double getY() {
        return y;
    }

    void draw(Graphics g) {

        g.setColor(c);

        g.drawOval((int) x, (int) y, width, height);

    }

}
