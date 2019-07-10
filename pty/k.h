//! \file k.h \brief less is more
#pragma once

#define _GNU_SOURCE
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//! arthur way
typedef char   C;
typedef char*  S;
typedef int    I;
typedef short  H;
typedef void   V;
typedef float  E;
typedef double F;
typedef long   J;
typedef unsigned long  UJ;
typedef unsigned int   UI;
typedef unsigned short UH;
typedef unsigned char  G;

//! no stinking loops
#define DO(n,x) {UJ i=0,_i=(n);for(;i<_i;++i){x;}}
#define W(x) while((x))

//! unclutter
#define R   return
#define Z   static
#define O   printf
#define PC  putchar
#define SZ  sizeof
#define ZV  Z V
#define ZI  Z I
#define ZC  Z C
#define ZH  Z H
#define ZS  Z S
#define ZE  Z E
#define ZF  Z F
#define ZJ  Z J
#define R0  R 0
#define R1  R 1

//! safer switch 
#define SW switch
#define CD default
#define CS(n,x)	case n:;x;break;

//! fail fast
#define P(x,y) {if(x)R(y);} //< panic
#define X(x,y,z) {if(x){(y);R(z);}} //< clean+panic

//! easy math
#define ABS(x) (((x)>0)?(x):-(x))
#define MIN(x,y) ((y)>(x)?(x):(y))
#define MAX(x,y) ((y)>(x)?(y):(x))
#define IN(l,x,r) ((l)<=(x)&&(x)<=(r))

//! usual suspects
#define scnt(x) (UJ)strlen((S)(x))
#define scmp(x,y) strcmp((S)(x),(S)(y))
#define sstr(h,n) strstr((S)(h),(S)(n))
#define schr(h,n) (S)strchr((S)(h),n)
#define rchr(h,n) (S)strrchr((S)(h),n)
#define mcpy(d,s,n) memcpy((d),(s),n)
#define mcmp(d,s,n) memcmp((d),(s),n)
#define scpy(d,s,n) (S)mcpy((S)d,(S)s,1+MIN(scnt((S)s),n))
#define lcse(s,n) {DO(n,s[i]=tolower(s[i]))}

//:~
