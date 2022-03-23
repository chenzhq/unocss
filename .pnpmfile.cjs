function readPackage(pkg) {
    if (pkg.dependencies['@unocss/preset-mini']) {
        delete pkg.dependencies['@unocss/preset-mini'];
        pkg.dependencies['@zhmu/unocss-preset-mini'] = 'workspace:*'
    }
    if (pkg.dependencies['@unocss/preset-wind']) {
        delete pkg.dependencies['@unocss/preset-wind'];
        pkg.dependencies['@zhmu/unocss-preset-wind'] = 'workspace:*'
    }

    if (pkg.devDependencies['@unocss/preset-mini']) {
        delete pkg.devDependencies['@unocss/preset-mini'];
        pkg.devDependencies['@zhmu/unocss-preset-mini'] = 'workspace:*'
    }
    if (pkg.devDependencies['@unocss/preset-wind']) {
        delete pkg.devDependencies['@unocss/preset-wind'];
        pkg.devDependencies['@zhmu/unocss-preset-wind'] = 'workspace:*'
    }
    return pkg;
}

module.exports = {
    hooks: {
        readPackage
    }
}