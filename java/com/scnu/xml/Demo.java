package com.scnu.xml;

import java.io.PrintWriter;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * @说明 使用DOM组装和解析XML
 * @author cuisuqiang
 * @version 1.0
 * @since
 */
public class Demo{
	
	public static void main(String[] args) {
//		Demo d = new Demo();
//		String file = "C:\\p.xml"; // 文件存放位置
//		d.createXml(file);
//		d.parserXml(file);
		
	}

	/**
	 * 生成XML文件
	 * @param filePath 文件存放位置
	 */
	public void createXml(String filePath) {
		try {
			// 定义工厂 API，使应用程序能够从 XML 文档获取生成 DOM 对象树的解析器
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			// 定义 API， 使其从 XML 文档获取 DOM 文档实例。使用此类，应用程序员可以从 XML 获取一个 Document
			DocumentBuilder builder = factory.newDocumentBuilder();
			// Document 接口表示整个 HTML 或 XML 文档。从概念上讲，它是文档树的根，并提供对文档数据的基本访问
			Document document = builder.newDocument();
		
			
			Element root = document.createElement("persons");
			document.appendChild(root);
			Element person = document.createElement("person");
			Element name = document.createElement("name");
			name.setAttribute("x", "222");
			name.appendChild(document.createTextNode("java小强"));
			person.appendChild(name);
			Element sex = document.createElement("sex");
			sex.appendChild(document.createTextNode("man"));
			person.appendChild(sex);
			Element age = document.createElement("age");
			age.appendChild(document.createTextNode("30"));
			person.appendChild(age);
			root.appendChild(person);
			
			TransformerFactory tf = TransformerFactory.newInstance();
			// 此抽象类的实例能够将源树转换为结果树
			Transformer transformer = tf.newTransformer();
			DOMSource source = new DOMSource(document);
			transformer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
			// 一个节点后换行，你可以设置为true，然后尝试解析看打印结果
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			// 向文本输出流打印对象的格式化表示形式
			// 要保证你的文本输出后格式不乱码，打印对象需指定打印格式，以标记此文本支持的格式
			PrintWriter pw = new PrintWriter(System.out);
			// 充当转换结果的持有者，可以为 XML、纯文本、HTML 或某些其他格式的标记
			StreamResult result = new StreamResult(pw);
			transformer.transform(source, result);
			System.out.println("生成XML文件成功!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 解析XML
	 * @param filePath 文件位置
	 */
	public void parserXml(String filePath) {
		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document document = db.parse(filePath);
			// 接口提供对节点的有序集合的抽象，没有定义或约束如何实现此集合。DOM 中的 NodeList 对象是活动的
			// NodeList 中的项可以通过从 0 开始的整数索引进行访问
			NodeList xml = document.getChildNodes();
			for (int i = 0; i < xml.getLength(); i++) {
				Node roots = xml.item(i);
				NodeList persons = roots.getChildNodes();
				for (int j = 0; j < persons.getLength(); j++) {
					Node person = persons.item(j);
					NodeList pros = person.getChildNodes();
					for (int k = 0; k < pros.getLength(); k++) {
						Node item = pros.item(k);
						System.out.println(item.getNodeName() + ":" + item.getTextContent());
					}
				}
			}
			System.out.println("XML解析完毕");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
