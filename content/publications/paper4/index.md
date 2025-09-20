---
title: "Scalable Non-Cartesian Magnetic Resonance Imaging with R2D2"
date: 2024-08-26
tags:
  [
    "medical imaging",
    "non-Cartesian imaging",
    "magnetic resonance imaging",
    "image reconstruction",
    "machine learning",
    "deep learning",
    "optimisation",
    "uncertainty quantification",
    "epistemic uncertainty",
  ]
author:
  ["Yiwei Chen", "Chao Tang", "Amir Aghabiglou", "Chung San Chu", "Yves Wiaux"]
description: "This paper brings the development of R2D2 to the field of medical imaging, specifically for magnetic resonance imaging with non-Cartesian sampling. Published in the 32nd European Signal Processing Conference (EUSIPCO), 2024."
summary: "This paper brings the development of R2D2 to the field of medical imaging, specifically for magnetic resonance imaging with non-Cartesian sampling."
# cover:
#   image: "r2d2_cygnus_A_UQ.png"
#   alt: "Joint image estimation and uncertainty quantification with R2D2 on Cygnus A VLA data"
#   relative: true
editPost:
  URL: "https://ieeexplore.ieee.org/abstract/document/10714974"
  Text: "2024 32nd European Signal Processing Conference (EUSIPCO)"
---

---

##### Download

- [Paper (arXiv)](https://arxiv.org/abs/2403.17905)
- [Paper (conference)](https://ieeexplore.ieee.org/abstract/document/10714974/)
<!-- - [Code and data](https://github.com/basp-group/R2D2-RI/tree/main) -->

---

##### Abstract

We propose a new approach for non-Cartesian magnetic resonance image reconstruction. While unrolled architectures provide robustness via data-consistency layers, embedding measurement operators in Deep Neural Network (DNN) can become impractical at large scale. Alternative Plug-and-Play (PnP) approaches, where the denoising DNNs are blind to the measurement setting, are not affected by this limitation and have also proven effective, but their highly iterative nature also affects scalability. To address this scalability challenge, we leverage the “Residual-to-Residual DNN series for high-Dynamic range imaging (R2D2)” approach recently introduced in astronomical imaging. R2D2's reconstruction is formed as a series of residual images, iteratively estimated as outputs of DNNs taking the previous iteration's image estimate and associated data residual as inputs. The method can be interpreted as a learned version of the Matching Pursuit algorithm. We demonstrate R2D2 in simulation, considering radial k-space sampling acquisition sequences. Our preliminary results suggest that R2D2 achieves: (i) suboptimal performance compared to its unrolled incarnation R2D2-Net, which is however non-scalable due to the necessary embedding of NUFFT-based data-consistency layers; (ii) superior reconstruction quality to a scalable version of R2D2-Net embedding an FFT-based approximation for data consistency; (iii) superior reconstruction quality to PnP, while only requiring few iterations.

---

##### Citation

Chen, Yiwei, Chao Tang, Amir Aghabiglou, Chung San Chu, and Yves Wiaux. "Scalable non-cartesian magnetic resonance imaging with R2D2." In 2024 32nd European Signal Processing Conference (EUSIPCO), pp. 1511-1515. IEEE, 2024. https://ieeexplore.ieee.org/abstract/document/10714974.

```BibTeX
@inproceedings{chen2024scalable,
  title={Scalable non-cartesian magnetic resonance imaging with R2D2},
  author={Chen, Yiwei and Tang, Chao and Aghabiglou, Amir and San Chu, Chung and Wiaux, Yves},
  booktitle={2024 32nd European Signal Processing Conference (EUSIPCO)},
  pages={1511--1515},
  year={2024},
  organization={IEEE},
  url={https://ieeexplore.ieee.org/abstract/document/10714974}
}
```

<!-- ---

##### Related material

+ [Nontechnical summary](https://www.alexandermccallsmith.com/book/your-inner-hedgehog) -->
