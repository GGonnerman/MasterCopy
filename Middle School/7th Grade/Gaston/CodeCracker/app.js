/*Master key
~ = "seperating each letter"
a = ()
b = {}
c = {)
d = (}
e = _-
f = |-
g = %&
h = {-}
i = *|
j = #%
k = |[]
l = <?
m = \|/
n = \|
o = @|*
p = |)
q = %<
r = !#
s = $*
t = -|-
u = (_)
v = /\
w = /\/
x = !/\
y = $|\
z = -\-\
1 = *%
2 = &%
3 = ^%
4 = %%
5 = $%
6 = #%
7 = @%
8 = !%
9 = )%
0 = (%
, = <$>
. = <|>
? = <@>
/ = <+>
"space" = +-+
anything else = nothing
  */
var key = {
    (): "a",
{}: "b",
{): "c",
(}: "d",
_-: "e",
|-: "f",
%&: "g",
{-}: "h",
*|: "i",
#%: "j",
|[]: "k",
<?: "l",
\|/: "m",
\|: "n",
@|*: "o",
|): "p",
%<: "q",
!#: "r",
$*: "s",
-|-: "t",
(_): "u",
/\: "v"
/\/: "w",
!/\: "x",
$|\: "y",
-\-\: "z",
*%: "1"
&%: "2",
^%: "3",
%%: "4",
$%: "5",
#%: "6",
@%: "7",
!%: "8",
)%: "9",
(%: "0",
<$>: ",",
<|>: ".",
<@>: "?",
<+>: "\"
};
function decode() {
    var x = document.getElementById("codeToChange").value;
    x = x.split("~");
    Object.keys(obj).length
    for
}
//functiion encript() {
// var wordInNeed =;
//for (i =< wordInNeed.length; i = "First letter (0)"; i++ "next letter"){
//"check if i = all of the letters and change to code"
//}
