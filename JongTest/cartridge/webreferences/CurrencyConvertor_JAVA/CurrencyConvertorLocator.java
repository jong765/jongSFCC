/**
 * CurrencyConvertorLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package currencyconvertor;

public class CurrencyConvertorLocator extends org.apache.axis.client.Service implements currencyconvertor.CurrencyConvertor {

    public CurrencyConvertorLocator() {
    }


    public CurrencyConvertorLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public CurrencyConvertorLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for CurrencyConvertorSoap
    private java.lang.String CurrencyConvertorSoap_address = "http://www.webservicex.net/CurrencyConvertor.asmx";

    public java.lang.String getCurrencyConvertorSoapAddress() {
        return CurrencyConvertorSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String CurrencyConvertorSoapWSDDServiceName = "CurrencyConvertorSoap";

    public java.lang.String getCurrencyConvertorSoapWSDDServiceName() {
        return CurrencyConvertorSoapWSDDServiceName;
    }

    public void setCurrencyConvertorSoapWSDDServiceName(java.lang.String name) {
        CurrencyConvertorSoapWSDDServiceName = name;
    }

    public currencyconvertor.CurrencyConvertorSoap_PortType getCurrencyConvertorSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(CurrencyConvertorSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getCurrencyConvertorSoap(endpoint);
    }

    public currencyconvertor.CurrencyConvertorSoap_PortType getCurrencyConvertorSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            currencyconvertor.CurrencyConvertorSoap_BindingStub _stub = new currencyconvertor.CurrencyConvertorSoap_BindingStub(portAddress, this);
            _stub.setPortName(getCurrencyConvertorSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setCurrencyConvertorSoapEndpointAddress(java.lang.String address) {
        CurrencyConvertorSoap_address = address;
    }


    // Use to get a proxy class for CurrencyConvertorSoap12
    private java.lang.String CurrencyConvertorSoap12_address = "http://www.webservicex.net/CurrencyConvertor.asmx";

    public java.lang.String getCurrencyConvertorSoap12Address() {
        return CurrencyConvertorSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String CurrencyConvertorSoap12WSDDServiceName = "CurrencyConvertorSoap12";

    public java.lang.String getCurrencyConvertorSoap12WSDDServiceName() {
        return CurrencyConvertorSoap12WSDDServiceName;
    }

    public void setCurrencyConvertorSoap12WSDDServiceName(java.lang.String name) {
        CurrencyConvertorSoap12WSDDServiceName = name;
    }

    public currencyconvertor.CurrencyConvertorSoap_PortType getCurrencyConvertorSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(CurrencyConvertorSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getCurrencyConvertorSoap12(endpoint);
    }

    public currencyconvertor.CurrencyConvertorSoap_PortType getCurrencyConvertorSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            currencyconvertor.CurrencyConvertorSoap12Stub _stub = new currencyconvertor.CurrencyConvertorSoap12Stub(portAddress, this);
            _stub.setPortName(getCurrencyConvertorSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setCurrencyConvertorSoap12EndpointAddress(java.lang.String address) {
        CurrencyConvertorSoap12_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     * This service has multiple ports for a given interface;
     * the proxy implementation returned may be indeterminate.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (currencyconvertor.CurrencyConvertorSoap_PortType.class.isAssignableFrom(serviceEndpointInterface)) {
                currencyconvertor.CurrencyConvertorSoap_BindingStub _stub = new currencyconvertor.CurrencyConvertorSoap_BindingStub(new java.net.URL(CurrencyConvertorSoap_address), this);
                _stub.setPortName(getCurrencyConvertorSoapWSDDServiceName());
                return _stub;
            }
            if (currencyconvertor.CurrencyConvertorSoap_PortType.class.isAssignableFrom(serviceEndpointInterface)) {
                currencyconvertor.CurrencyConvertorSoap12Stub _stub = new currencyconvertor.CurrencyConvertorSoap12Stub(new java.net.URL(CurrencyConvertorSoap12_address), this);
                _stub.setPortName(getCurrencyConvertorSoap12WSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("CurrencyConvertorSoap".equals(inputPortName)) {
            return getCurrencyConvertorSoap();
        }
        else if ("CurrencyConvertorSoap12".equals(inputPortName)) {
            return getCurrencyConvertorSoap12();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://www.webserviceX.NET/", "CurrencyConvertor");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://www.webserviceX.NET/", "CurrencyConvertorSoap"));
            ports.add(new javax.xml.namespace.QName("http://www.webserviceX.NET/", "CurrencyConvertorSoap12"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("CurrencyConvertorSoap".equals(portName)) {
            setCurrencyConvertorSoapEndpointAddress(address);
        }
        else 
if ("CurrencyConvertorSoap12".equals(portName)) {
            setCurrencyConvertorSoap12EndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
