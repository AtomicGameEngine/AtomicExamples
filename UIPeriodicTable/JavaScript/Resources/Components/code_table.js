'use strict';

exports.init = function(mylayout,mylogger) {

    var maintb = mylayout.getWidget("maintabs");
    var acttb = mylayout.getWidget("primarytabs");
    var semitb = mylayout.getWidget("moretabs");
    var viewtb = mylayout.getWidget("supporttabs");
    var supporttb = mylayout.getWidget("atomictabs");

// handle the periodic table jumps
    mylayout.getWidget("A1").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(0);    };
    mylayout.getWidget("A2").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(1);    };
    mylayout.getWidget("A3").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(2);    };
    mylayout.getWidget("A4").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(3);    };
    mylayout.getWidget("A5").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(4);    };
    mylayout.getWidget("A6").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(5);    };
    mylayout.getWidget("A7").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(6);    };
    mylayout.getWidget("A8").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(7);    };
    mylayout.getWidget("A9").onClick = function () {        maintb.setCurrentPage(1);        acttb.setCurrentPage(8);    };
    mylayout.getWidget("B1").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(0);    };
    mylayout.getWidget("B2").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(1);    };
    mylayout.getWidget("B3").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(2);    };
    mylayout.getWidget("B4").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(3);    };
    mylayout.getWidget("B5").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(4);    };
    mylayout.getWidget("B6").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(5);    };
    mylayout.getWidget("B7").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(6);    };
    mylayout.getWidget("B8").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(7);    };
    mylayout.getWidget("B9").onClick = function () {        maintb.setCurrentPage(2);        semitb.setCurrentPage(8);    };
    mylayout.getWidget("C1").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(0);    };
    mylayout.getWidget("C2").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(1);    };
    mylayout.getWidget("C3").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(2);    };
    mylayout.getWidget("C4").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(3);    };
    mylayout.getWidget("C5").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(4);    };
    mylayout.getWidget("C6").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(5);    };
    mylayout.getWidget("C7").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(6);    };
    mylayout.getWidget("C8").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(7);    };
    mylayout.getWidget("C9").onClick = function () {        maintb.setCurrentPage(3);        viewtb.setCurrentPage(8);    };
    mylayout.getWidget("D1").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(0);    };
    mylayout.getWidget("D2").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(1);    };
    mylayout.getWidget("D3").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(2);    };
    mylayout.getWidget("D4").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(3);    };
    mylayout.getWidget("D5").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(4);    };
    mylayout.getWidget("D6").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(5);    };
    mylayout.getWidget("D7").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(6);    };
    mylayout.getWidget("D8").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(7);    };
    mylayout.getWidget("D9").onClick = function () {        maintb.setCurrentPage(4);        supporttb.setCurrentPage(8);    };

};

