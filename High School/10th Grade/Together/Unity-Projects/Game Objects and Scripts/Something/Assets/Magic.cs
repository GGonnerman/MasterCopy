using System;
using UnityEngine;

public class Magic : MonoBehaviour {
	public Transform prefab;
	[Range(1, 100)]
	public int resolution = 5;
	[Range(1, 100)]
	public int range = 2;

	private Transform[] spheres;
	private static System.Random random = new System.Random();

	void Awake() {
		spheres = new Transform[resolution * resolution];
		float scale = (float) range / resolution;

		Vector3 position = new Vector3();
		position.y = 0f;
		for(int x = 0; x < resolution; x++) {
			position.x = ( scale * x ) - ( range * 0.5f ) + ( scale * 0.5f );
			for(int z = 0; z < resolution; z++) {
				position.z = ( scale * z ) - ( range * 0.5f ) + ( scale * 0.5f );
				Transform sphere = Instantiate(prefab);
				sphere.localPosition = position;
				sphere.localScale = Vector3.one * scale;
				sphere.SetParent(transform, false);
				Debug.Log(x + z);
				spheres[(x * resolution) + z] = sphere;
			}
		}
	}

	void Update() {
		float time = Time.time;
		for(int i = 0; i < spheres.Length; i++) {
			Vector3 position = spheres[i].localPosition;
			position = Ripple(position.x, position.z, time); // (float) random.NextDouble() * 2f;
			spheres[i].localPosition = position;
		}
	}

	static Vector3 Ripple(float x, float z, float t) {
		Vector3 position = new Vector3();
		position.x = x;
		position.y = (float) (10f * Mathf.Sin(Mathf.Sqrt(x*x + z*z) - t) / (Math.Pow(Mathf.Sqrt(x*x + z*z), 0.8f)));
		position.z = z;
		return position;
	}
}
