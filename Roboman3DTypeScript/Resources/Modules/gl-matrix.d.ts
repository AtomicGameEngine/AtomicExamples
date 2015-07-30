// Type definitions for gl-matrix 2.3.1
// Project: http://glmatrix.net/
// Definitions by: chuntaro <https://github.com/chuntaro/>
// Definitions: https://github.com/chuntaro/gl-matrix.d.ts


declare module "gl-matrix" {

    interface glMatrix {
        EPSILON: number;
        ARRAY_TYPE: number[];
        RANDOM: () => number;
        setMatrixArrayType<T>(type: T): void;
        toRadian(a: number): number;
    }

    export var glMatrix: glMatrix;


    export interface vec2 {
        create(): number[];
        clone(a: number[]): number[];
        fromValues(x: number, y: number): number[];
        copy(out: number[], a: number[]): number[];
        set(out: number[], x: number, y: number): number[];
        add(out: number[], a: number[], b: number[]): number[];
        subtract(out: number[], a: number[], b: number[]): number[];
        sub(out: number[], a: number[], b: number[]): number[];
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        divide(out: number[], a: number[], b: number[]): number[];
        div(out: number[], a: number[], b: number[]): number[];
        min(out: number[], a: number[], b: number[]): number[];
        max(out: number[], a: number[], b: number[]): number[];
        scale(out: number[], a: number[], b: number): number[];
        scaleAndAdd(out: number[], a: number[], b: number[], scale: number): number[];
        distance(a: number[], b: number[]): number;
        dist(a: number[], b: number[]): number;
        squaredDistance(a: number[], b: number[]): number;
        sqrDist(a: number[], b: number[]): number;
        length(a: number[]): number;
        len(a: number[]): number;
        squaredLength(a: number[]): number;
        sqrLen(a: number[]): number;
        negate(out: number[], a: number[]): number[];
        inverse(out: number[], a: number[]): number[];
        normalize(out: number[], a: number[]): number[];
        dot(a: number[], b: number[]): number;
        cross(out: number[], a: number[], b: number[]): number[];
        lerp(out: number[], a: number[], b: number[], t: number): number[];
        random(out: number[], scale: number): number[];
        transformMat2(out: number[], a: number[], m: number[]): number[];
        transformMat2d(out: number[], a: number[], m: number[]): number[];
        transformMat3(out: number[], a: number[], m: number[]): number[];
        transformMat4(out: number[], a: number[], m: number[]): number[];
        forEach<T>(a: number[][], stride: number, offset: number, count: number, fn: (a: number[], b: number[], arg: T) => void, arg: T): number[][];
        str(a: number[]): string;
    }

    export var vec2: vec2;


    interface vec3 {
        create(): number[];
        clone(a: number[]): number[];
        fromValues(x: number, y: number, z: number): number[];
        copy(out: number[], a: number[]): number[];
        set(out: number[], x: number, y: number, z: number): number[];
        add(out: number[], a: number[], b: number[]): number[];
        subtract(out: number[], a: number[], b: number[]): number[];
        sub(out: number[], a: number[], b: number[]): number[];
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        divide(out: number[], a: number[], b: number[]): number[];
        div(out: number[], a: number[], b: number[]): number[];
        min(out: number[], a: number[], b: number[]): number[];
        max(out: number[], a: number[], b: number[]): number[];
        scale(out: number[], a: number[], b: number): number[];
        scaleAndAdd(out: number[], a: number[], b: number[], scale: number): number[];
        distance(a: number[], b: number[]): number;
        dist(a: number[], b: number[]): number;
        squaredDistance(a: number[], b: number[]): number;
        sqrDist(a: number[], b: number[]): number;
        length(a: number[]): number;
        len(a: number[]): number;
        squaredLength(a: number[]): number;
        sqrLen(a: number[]): number;
        negate(out: number[], a: number[]): number[];
        inverse(out: number[], a: number[]): number[];
        normalize(out: number[], a: number[]): number[];
        dot(a: number[], b: number[]): number;
        cross(out: number[], a: number[], b: number[]): number[];
        lerp(out: number[], a: number[], b: number[], t: number): number[];
        hermite(out: number[], a: number[], b: number[], c: number[], d: number[], t: number): number[];
        bezier(out: number[], a: number[], b: number[], c: number[], d: number[], t: number): number[];
        random(out: number[], scale: number): number[];
        transformMat4(out: number[], a: number[], m: number[]): number[];
        transformMat3(out: number[], a: number[], m: number[]): number[];
        transformQuat(out: number[], a: number[], q: number[]): number[];
        rotateX(out: number[], a: number[], b: number[], c: number): number[];
        rotateY(out: number[], a: number[], b: number[], c: number): number[];
        rotateZ(out: number[], a: number[], b: number[], c: number): number[];
        forEach<T>(a: number[][], stride: number, offset: number, count: number, fn: (a: number[], b: number[], arg: T) => void, arg: T): number[][];
        angle(a: number[], b: number[]): number;
        str(a: number[]): string;
    }

    export var vec3: vec3;

    interface vec4 {
        create(): number[];
        clone(a: number[]): number[];
        fromValues(x: number, y: number, z: number, w: number): number[];
        copy(out: number[], a: number[]): number[];
        set(out: number[], x: number, y: number, z: number, w: number): number[];
        add(out: number[], a: number[], b: number[]): number[];
        subtract(out: number[], a: number[], b: number[]): number[];
        sub(out: number[], a: number[], b: number[]): number[];
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        divide(out: number[], a: number[], b: number[]): number[];
        div(out: number[], a: number[], b: number[]): number[];
        min(out: number[], a: number[], b: number[]): number[];
        max(out: number[], a: number[], b: number[]): number[];
        scale(out: number[], a: number[], b: number): number[];
        scaleAndAdd(out: number[], a: number[], b: number[], scale: number): number[];
        distance(a: number[], b: number[]): number;
        dist(a: number[], b: number[]): number;
        squaredDistance(a: number[], b: number[]): number;
        sqrDist(a: number[], b: number[]): number;
        length(a: number[]): number;
        len(a: number[]): number;
        squaredLength(a: number[]): number;
        sqrLen(a: number[]): number;
        negate(out: number[], a: number[]): number[];
        inverse(out: number[], a: number[]): number[];
        normalize(out: number[], a: number[]): number[];
        dot(a: number[], b: number[]): number;
        lerp(out: number[], a: number[], b: number[], t: number): number[];
        random(out: number[], scale: number): number[];
        transformMat4(out: number[], a: number[], m: number[]): number[];
        transformQuat(out: number[], a: number[], q: number[]): number[];
        forEach<T>(a: number[][], stride: number, offset: number, count: number, fn: (a: number[], b: number[], arg: T) => void, arg: T): number[][];
        str(a: number[]): string;
    }

    export var vec4: vec4;

    interface mat2 {
        create(): number[];
        clone(a: number[]): number[];
        copy(out: number[], a: number[]): number[];
        identity(out: number[]): number[];
        transpose(out: number[], a: number[]): number[];
        invert(out: number[], a: number[]): number[];
        adjoint(out: number[], a: number[]): number[];
        determinant(a: number[]): number;
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        rotate(out: number[], a: number[], rad: number): number[];
        scale(out: number[], a: number[], v: number[]): number[];
        fromRotation(out: number[], rad: number): number[];
        fromScaling(out: number[], v: number[]): number[];
        str(a: number[]): string;
        frob(a: number[]): number;
        LDU(L: number[], D: number[], U: number[], a: number[]): number[][];
    }

    export var mat2: mat2;

    interface mat2d {
        create(): number[];
        clone(a: number[]): number[];
        copy(out: number[], a: number[]): number[];
        identity(out: number[]): number[];
        invert(out: number[], a: number[]): number[];
        determinant(a: number[]): number;
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        rotate(out: number[], a: number[], rad: number): number[];
        scale(out: number[], a: number[], v: number[]): number[];
        translate(out: number[], a: number[], v: number[]): number[];
        fromRotation(out: number[], rad: number): number[];
        fromScaling(out: number[], v: number[]): number[];
        fromTranslation(out: number[], v: number[]): number[];
        str(a: number[]): string;
        frob(a: number[]): number;
    }
    export var mat2d: mat2d;


    interface mat3 {
        create(): number[];
        fromMat4(out: number[], a: number[]): number[];
        clone(a: number[]): number[];
        copy(out: number[], a: number[]): number[];
        identity(out: number[]): number[];
        transpose(out: number[], a: number[]): number[];
        invert(out: number[], a: number[]): number[];
        adjoint(out: number[], a: number[]): number[];
        determinant(a: number[]): number;
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        translate(out: number[], a: number[], v: number[]): number[];
        rotate(out: number[], a: number[], rad: number): number[];
        scale(out: number[], a: number[], v: number[]): number[];
        fromTranslation(out: number[], v: number[]): number[];
        fromRotation(out: number[], rad: number): number[];
        fromScaling(out: number[], v: number[]): number[];
        fromMat2d(out: number[], a: number[]): number[];
        fromQuat(out: number[], q: number[]): number[];
        normalFromMat4(out: number[], a: number[]): number[];
        str(a: number[]): string;
        frob(a: number[]): number;
    }
    export var mat3: mat3;


    interface mat4 {
        create(): number[];
        clone(a: number[]): number[];
        copy(out: number[], a: number[]): number[];
        identity(out: number[]): number[];
        transpose(out: number[], a: number[]): number[];
        invert(out: number[], a: number[]): number[];
        adjoint(out: number[], a: number[]): number[];
        determinant(a: number[]): number;
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        translate(out: number[], a: number[], v: number[]): number[];
        scale(out: number[], a: number[], v: number[]): number[];
        rotate(out: number[], a: number[], rad: number, axis: number[]): number[];
        rotateX(out: number[], a: number[], rad: number): number[];
        rotateY(out: number[], a: number[], rad: number): number[];
        rotateZ(out: number[], a: number[], rad: number): number[];
        fromTranslation(out: number[], v: number[]): number[];
        fromScaling(out: number[], v: number[]): number[];
        fromRotation(out: number[], rad: number, axis: number[]): number[];
        fromXRotation(out: number[], rad: number): number[];
        fromYRotation(out: number[], rad: number): number[];
        fromZRotation(out: number[], rad: number): number[];
        fromRotationTranslation(out: number[], q: number[], v: number[]): number[];
        fromRotationTranslationScale(out: number[], q: number[], v: number[], s: number[]): number[];
        fromRotationTranslationScaleOrigin(out: number[], q: number[], v: number[], s: number[], o: number[]): number[];
        fromQuat(out: number[], q: number[]): number[];
        frustum(out: number[], left: number, right: number, bottom: number, top: number, near: number, far: number): number[];
        perspective(out: number[], fovy: number, aspect: number, near: number, far: number): number[];
        perspectiveFromFieldOfView(out: number[], fov: number, near: number, far: number): number[];
        ortho(out: number[], left: number, right: number, bottom: number, top: number, near: number, far: number): number[];
        lookAt(out: number[], eye: number[], center: number[], up: number[]): number[];
        str(a: number[]): string;
        frob(a: number[]): number;
    }
    export var mat4: mat4;


    interface quat {
        create(): number[];
        rotationTo(out: number[], a: number[], b: number[]): number[];
        setAxes(out: number[], view: number[], right: number[], up: number[]): number[];
        clone(a: number[]): number[];
        fromValues(x: number, y: number, z: number, w: number): number[];
        copy(out: number[], a: number[]): number[];
        set(out: number[], x: number, y: number, z: number, w: number): number[];
        identity(out: number[]): number[];
        setAxisAngle(out: number[], axis: number[], rad: number): number[];
        add(out: number[], a: number[], b: number[]): number[];
        multiply(out: number[], a: number[], b: number[]): number[];
        mul(out: number[], a: number[], b: number[]): number[];
        scale(out: number[], a: number[], b: number): number[];
        rotateX(out: number[], a: number[], rad: number): number[];
        rotateY(out: number[], a: number[], rad: number): number[];
        rotateZ(out: number[], a: number[], rad: number): number[];
        calculateW(out: number[], a: number[]): number[];
        dot(a: number[], b: number[]): number;
        lerp(out: number[], a: number[], b: number[], t: number): number[];
        slerp(out: number[], a: number[], b: number[], t: number): number[];
        sqlerp(out: number[], a: number[], b: number[], c: number[], d: number[], t: number): number[];
        invert(out: number[], a: number[]): number[];
        conjugate(out: number[], a: number[]): number[];
        length(a: number[]): number;
        len(a: number[]): number;
        squaredLength(a: number[]): number;
        sqrLen(a: number[]): number;
        normalize(out: number[], a: number[]): number[];
        fromMat3(out: number[], m: number[]): number[];
        str(a: number[]): string;
    }
    export var quat: quat;

}
