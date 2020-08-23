import javax.swing.*;
import java.awt.*;

class SwingTimerEx extends JFrame {

    private SwingTimerEx() {
        initUI();
    }

    private void initUI() {

        add(new Board());

        setResizable(false);
        pack();

        setTitle("Physics");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -> {
            SwingTimerEx ex = new SwingTimerEx();
            ex.setVisible(true);
        });
    }

}
