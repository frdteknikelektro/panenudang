import _ from "lodash";

function hitungHargaSize(values, i, k, data, bongkar, hargaSize) {
  //   console.log("data bongkar", bongkar);
  let naikSize: number = 0;
  let naikTon: number = 0;
  //naikin size dan tonase

  let percentLcs = [];
  percentLcs = _.filter(bongkar, function (o) {
    // console.log("lodash", data[i].fields.initial_name, o.fields.pabrik);
    return o.fields.pabrik === data[i].fields.initial_name;
  });
  console.log(data[i].fields.initial_name, percentLcs);

  naikSize =
    values.panen[k].size -
    values.panen[k].size * _.divide(percentLcs[0].fields.percent_size, 100);
  naikTon =
    values.panen[k].tonase +
    values.panen[k].tonase * _.divide(percentLcs[0].fields.percent_ton, 100);

  if (naikSize < 30) {
    hargaSize =
      (30 - naikSize) *
        ((data[i].fields.size_20 - data[i].fields.size_30) * 0.1) +
      data[i].fields.size_30;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 40) {
    hargaSize =
      (40 - naikSize) *
        ((data[i].fields.size_30 - data[i].fields.size_40) * 0.1) +
      data[i].fields.size_40;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 50) {
    hargaSize =
      (50 - naikSize) *
        ((data[i].fields.size_40 - data[i].fields.size_50) * 0.1) +
      data[i].fields.size_50;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 60) {
    hargaSize =
      (60 - naikSize) *
        ((data[i].fields.size_50 - data[i].fields.size_60) * 0.1) +
      data[i].fields.size_60;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 70) {
    hargaSize =
      (70 - naikSize) *
        ((data[i].fields.size_60 - data[i].fields.size_70) * 0.1) +
      data[i].fields.size_70;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 80) {
    hargaSize =
      (80 - naikSize) *
        ((data[i].fields.size_70 - data[i].fields.size_80) * 0.1) +
      data[i].fields.size_80;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 90) {
    hargaSize =
      (90 - naikSize) *
        ((data[i].fields.size_80 - data[i].fields.size_90) * 0.1) +
      data[i].fields.size_90;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 100) {
    hargaSize =
      (100 - naikSize) *
        ((data[i].fields.size_90 - data[i].fields.size_100) * 0.1) +
      data[i].fields.size_100;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 110) {
    hargaSize =
      (110 - naikSize) *
        ((data[i].fields.size_100 - data[i].fields.size_110) * 0.1) +
      data[i].fields.size_110;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 120) {
    hargaSize =
      (120 - naikSize) *
        ((data[i].fields.size_110 - data[i].fields.size_120) * 0.1) +
      data[i].fields.size_120;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 130) {
    hargaSize =
      (130 - naikSize) *
        ((data[i].fields.size_120 - data[i].fields.size_130) * 0.1) +
      data[i].fields.size_130;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 140) {
    hargaSize =
      (140 - naikSize) *
        ((data[i].fields.size_130 - data[i].fields.size_140) * 0.1) +
      data[i].fields.size_140;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  }
  if (naikSize < 150) {
    hargaSize =
      (150 - naikSize) *
        ((data[i].fields.size_140 - data[i].fields.size_150) * 0.1) +
      data[i].fields.size_150;
    if (hargaSize < 0) {
      hargaSize = 0;
    }
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: _.round(hargaSize * naikTon),
    };
  } else {
    return {
      size: values.panen[k].size,
      tonase: values.panen[k].tonase,
      naikSize: _.round(naikSize, 2),
      naikTon: _.round(naikTon, 2),
      harga: 0,
    };
  }
}

export function hitungHargaPabrik(values, data, bongkar, semuaPabrik) {
  for (let i = 0; i < data.length; i++) {
    let hargaSize: number;
    let multiHarga: any[] = [];
    for (let k = 0; k < values.panen.length; k++) {
      multiHarga.push(hitungHargaSize(values, i, k, data, bongkar, hargaSize));
      // console.log(`loop dalam ${i} ${k}`, multiHarga);
    }
    semuaPabrik.push({
      id: data[i].id,
      pabrik: data[i].fields.full_name,
      initial: data[i].fields.initial_name,
      harga: multiHarga,
      total: _.sumBy(multiHarga, "harga"),
    });
    // console.log("loop luar", multiHarga);
  }
}
