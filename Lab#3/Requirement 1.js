// Extremely Ugly Inventory Management System

var i = [],
  t = [],
  c = [],
  f = {};

function doStuff(a, b) {
  if (a === "add" || a === "edit" || a === "rmI") {
    if (a === "add" || a === "edit") {
      var n = b[0],
        ca = b[1],
        q = b[2],
        p = b[3],
        u = b[4],
        cf = b[5] || {};
      if (a === "add") {
        if (q < 10) {
          console.log(
            `ALERT: Item ${n} is below 10 units! Current quantity: ${q}`
          );
        }
        var itm = {
          n: n,
          cat: ca,
          qty: q,
          prc: p,
          unt: u,
          added: new Date(),
          custF: cf,
        };
        i.push(itm);
        if (c.indexOf(ca) === -1) {
          c.push(ca);
        }
        t.push({ type: "add", itm: itm });
      } else {
        var idx = b[0];
        if (i[idx]) {
          var oldItm = i[idx];
          var newItm = {
            n: b[1],
            cat: b[2],
            qty: b[3],
            prc: b[4],
            unt: b[5],
            added: oldItm.added,
            custF: b[6] || {},
          };
          if (newItm.qty < 10) {
            console.log(
              `ALERT: Item ${newItm.n} is below 10 units! Current quantity: ${newItm.qty}`
            );
          }
          t.push({ type: "edit", old: oldItm, new: newItm });
          i[idx] = newItm;
        } else {
          console.log("Cannot edit, no item.");
        }
      }
    }
    if (a === "rmI") {
      var delIdx = b[0];
      if (i[delIdx]) {
        t.push({ type: "delete", itm: i[delIdx] });
        i.splice(delIdx, 1);
      } else {
        console.log("Cannot delete, not found.");
      }
    }
    // Dashboard Update for add/edit/delete
    console.log("=== Dashboard ===");
    console.log("Items: " + i.length);
    var tot = 0;
    for (var j = 0; j < i.length; j++) {
      tot += i[j].qty * i[j].prc;
    }
    console.log("Total: $" + tot.toFixed(2));
    console.log("Cats: " + c.join(", "));
  }

  if (a === "Sale" || a === "rstck") {
    var n = b[0],
      qty = b[1];
    for (var k = 0; k < i.length; k++) {
      if (i[k].n === n) {
        if (a === "Sale") {
          if (i[k].qty >= qty) {
            i[k].qty -= qty;
            if (i[k].qty < 10) {
              console.log(
                `ALERT: Item ${i[k].n} is below 10 units! Current quantity: ${i[k].qty}`
              );
            }
            t.push({ type: "sale", itm: i[k], qtyS: qty, d: new Date() });
            console.log("Sold " + qty + " " + i[k].unt + " of " + n);
          } else {
            console.log("Sale failed.");
          }
        } else {
          i[k].qty += qty;
          if (i[k].qty < 10) {
            console.log(
              `ALERT: Item ${i[k].n} is below 10 units! Current quantity: ${i[k].qty}`
            );
          }
          t.push({ type: "restock", itm: i[k], qtyR: qty, d: new Date() });
          console.log("Restocked " + qty + " " + i[k].unt + " of " + n);
        }
        // Dashboard Update for sale/restock
        console.log("=== Dashboard ===");
        console.log("Items: " + i.length);
        var totalV = 0;
        for (var m = 0; m < i.length; m++) {
          totalV += i[m].qty * i[m].prc;
        }
        console.log("Total: $" + totalV.toFixed(2));
        console.log("Cats: " + c.join(", "));
        break;
      }
    }
    if (k === i.length) {
      console.log("Operation failed: Item not found.");
    }
  }

  if (a === "srch" || a === "vwI" || a === "xprtAll") {
    if (a === "srch") {
      var sq = b[0].toLowerCase(),
        res = [];
      for (var n = 0; n < i.length; n++) {
        if (
          i[n].n.toLowerCase().indexOf(sq) !== -1 ||
          i[n].cat.toLowerCase().indexOf(sq) !== -1 ||
          i[n].prc.toString().indexOf(sq) !== -1
        ) {
          res.push(i[n]);
        }
      }
      console.log("Search:");
      for (var o = 0; o < res.length; o++) {
        console.log(
          res[o].n + ": " + res[o].qty + " " + res[o].unt + " @ $" + res[o].prc
        );
      }
    }
    if (a === "vwI") {
      console.log("=== Inv ===");
      for (var p = 0; p < i.length; p++) {
        var itmV = i[p];
        console.log(
          p +
            1 +
            ". " +
            itmV.n +
            " (" +
            itmV.qty +
            " " +
            itmV.unt +
            ") - $" +
            itmV.prc +
            ", " +
            itmV.cat +
            ", " +
            itmV.added.toLocaleString()
        );
      }
    }
    if (a === "xprtAll") {
      console.log("CSV:");
      var hdrs = "Name,Category,Quantity,Price,Unit,AddedAt";
      var dts = [];
      for (var q = 0; q < i.length; q++) {
        dts.push(
          i[q].n +
            "," +
            i[q].cat +
            "," +
            i[q].qty +
            "," +
            i[q].prc +
            "," +
            i[q].unt +
            "," +
            i[q].added
        );
      }
      console.log([hdrs].concat(dts).join("\n"));
    }
  }

  if (a === "vwAllT" || a === "vwIAg") {
    if (a === "vwAllT") {
      console.log("Transactions:");
      for (var r = 0; r < t.length; r++) {
        var tr = t[r];
        var ds = tr.d
          ? new Date(tr.d).toLocaleString()
          : new Date().toLocaleString();
        if (tr.itm && tr.itm.n) {
          console.log(
            r +
              1 +
              ". [" +
              tr.type.toUpperCase() +
              "] - " +
              tr.itm.n +
              " on " +
              ds +
              " | " +
              JSON.stringify(tr)
          );
        } else {
          console.log(
            r +
              1 +
              ". [" +
              tr.type.toUpperCase() +
              "] - No item associated with this transaction on " +
              ds +
              " | " +
              JSON.stringify(tr)
          );
        }
      }
    }
    if (a === "vwIAg") {
      console.log("Aging:");
      for (var s = 0; s < i.length; s++) {
        var days = Math.floor(
          (new Date() - new Date(i[s].added)) / (1000 * 60 * 60 * 24)
        );
        console.log(i[s].n + ": " + days + "d");
      }
    }
  }

  if (a === "Imprt" || a === "addFld" || a === "udCFld") {
    if (a === "Imprt") {
      var items = b[0];
      for (var uIdx = 0; uIdx < items.length; uIdx++) {
        doStuff("add", [
          items[uIdx].n,
          items[uIdx].cat,
          items[uIdx].quantity,
          items[uIdx].price,
          items[uIdx].unit,
        ]);
      }
      console.log("Bulk done.");
    }
    if (a === "addFld") {
      var fnc = b[0];
      if (!f[fnc]) {
        f[fnc] = null;
        console.log("Added field '" + fnc + "'.");
      } else {
        console.log("Field exists.");
      }
    }
    if (a === "udCFld") {
      var itmn = b[0],
        fld = b[1],
        val = b[2];
      for (var v = 0; v < i.length; v++) {
        if (i[v].n === itmn && f.hasOwnProperty(fld)) {
          i[v].custF[fld] = val;
          console.log("Updated '" + fld + "' for " + itmn + ".");
          break;
        }
      }
      if (v === i.length) {
        console.log("Update failed.");
      }
    }
  }
}

// Example Usage
doStuff("add", ["Laptop", "Electronics", 10, 1200, "pcs"]);
doStuff("add", ["T-Shirt", "Clothing", 50, 20, "pcs"]);
doStuff("add", ["Smartphone", "Electronics", 5, 800, "pcs"]);

doStuff("addFld", ["Warranty"]);
doStuff("udCFld", ["Laptop", "Warranty", "2 years"]);

doStuff("vwI");
doStuff("srch", ["Electronics"]);
doStuff("edit", [1, "T-Shirt", "Clothing", 1, 22, "pcs"]);
doStuff("Sale", ["Laptop", 2]);
doStuff("vwAllT");
doStuff("rstck", ["Smartphone", 3]);
doStuff("vwIAg");
doStuff("xprtAll");
doStuff("Imprt", [
  [
    { n: "Keyboard", cat: "Electronics", quantity: 20, price: 50, unit: "pcs" },
    { n: "Jacket", cat: "Clothing", quantity: 15, price: 80, unit: "pcs" },
  ],
]);
doStuff("vwI");
