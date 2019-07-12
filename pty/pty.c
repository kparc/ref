#define _DEFAULT_SOURCE
#define _XOPEN_SOURCE 600
#include "k.h"
#include <fcntl.h>
#include <termios.h>
#include <sys/select.h>
#include <sys/ioctl.h>
#include <unistd.h>

#define BSZ 8192

S USAGE = "usage: %s <command>\n";
C alt = 4;

I p(I i, I o, fd_set *r, S b) {
    I sz;
    if (FD_ISSET(i, r)) {
        sz = read(i, b, BSZ);
        if (sz > 0) write(o, b, sz);
        else if (sz < 0) R1;
        else write(o, &alt, 1);
    }
    R0;
}

I main(I argc, S* argv) {
    I m, s, pid;
    fd_set r;
    struct termios ts;
    C b[BSZ];
    X(argc < 2, fprintf(stderr, USAGE, argv[0]), 1)
    m = posix_openpt(O_RDWR);
    grantpt(m);
    unlockpt(m);
    s = open(ptsname(m), O_RDWR);
    tcgetattr(s, &ts);
    ts.c_lflag &= ~(ECHO | ECHOE | ECHOK | ECHONL);
    tcsetattr(s, TCSANOW, &ts);
    pid = fork();
    if (!pid) {
        // child process
        close(m);
        DO(3,dup2(s,i))
        close(s);
        setsid();
        ioctl(0, TIOCSCTTY, 1);
        execvp(argv[1], argv + 1);
    } else {
        // parent process
        close(s);
        W (1) {
            FD_ZERO(&r);
            FD_SET(0, &r);
            FD_SET(m, &r);
            if (!select(m + 1, &r, NULL, NULL, NULL)) break;
            if (p(0, m, &r, b)) break;
            if (p(m, 1, &r, b)) break;
        }
        close(m);
    }
    R0;
}
